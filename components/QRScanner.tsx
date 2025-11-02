'use client';

import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface QRScannerProps {
  onScan: (code: string) => void;
  onClose: () => void;
}

export default function QRScanner({ onScan, onClose }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string>('');
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannedRef = useRef(false);

  useEffect(() => {
    startScanner();
    return () => {
      stopScanner();
    };
  }, []);

  const startScanner = async () => {
    try {
      const scanner = new Html5Qrcode('qr-reader');
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        (decodedText) => {
          if (!scannedRef.current) {
            scannedRef.current = true;
            onScan(decodedText);
            stopScanner();
          }
        },
        (errorMessage) => {
          // Ignorar erros de varredura contínua
        }
      );

      setIsScanning(true);
    } catch (err) {
      console.error('Erro ao iniciar scanner:', err);
      setError('Não foi possível acessar a câmera. Verifique as permissões.');
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch (err) {
        console.error('Erro ao parar scanner:', err);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Escaneie o QR Code</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {error ? (
          <div className="text-red-600 text-center p-4">{error}</div>
        ) : (
          <>
            <div id="qr-reader" className="w-full"></div>
            <p className="text-sm text-gray-600 text-center mt-4">
              Posicione o QR code no centro da câmera
            </p>
          </>
        )}
      </div>
    </div>
  );
}
