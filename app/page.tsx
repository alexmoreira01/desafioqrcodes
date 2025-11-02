'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const QRScanner = dynamic(() => import('@/components/QRScanner'), {
  ssr: false,
});

const Mapa = dynamic(() => import('@/components/Mapa'), {
  ssr: false,
});

const ModalConclusao = dynamic(() => import('@/components/ModalConclusao'), {
  ssr: false,
});

type Pista = {
  id: number;
  ordem: number;
  titulo: string;
  descricao: string;
  latitude?: number;
  longitude?: number;
};

export default function Home() {
  const [pistas, setPistas] = useState<Pista[]>([]);
  const [pistasEncontradas, setPistasEncontradas] = useState<number[]>([]);
  const [showScanner, setShowScanner] = useState(false);
  const [showModalConclusao, setShowModalConclusao] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPistas();
    loadProgress();
  }, []);

  const fetchPistas = async () => {
    try {
      const res = await fetch('/api/pistas');
      const data = await res.json();
      setPistas(data.pistas);
    } catch (error) {
      console.error('Erro ao buscar pistas:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadProgress = () => {
    const saved = localStorage.getItem('pistasEncontradas');
    if (saved) {
      setPistasEncontradas(JSON.parse(saved));
    }
  };

  const saveProgress = (pistaId: number) => {
    const newProgress = [...pistasEncontradas, pistaId];
    setPistasEncontradas(newProgress);
    localStorage.setItem('pistasEncontradas', JSON.stringify(newProgress));
    
    // Verificar se completou todas as pistas
    if (newProgress.length === pistas.length && pistas.length > 0) {
      setTimeout(() => setShowModalConclusao(true), 1000);
    }
  };

  const handleValidate = async (code: string) => {
    try {
      const res = await fetch('/api/validar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo: code }),
      });

      const data = await res.json();

      if (data.valido) {
        setMessage({ type: 'success', text: data.mensagem });
        saveProgress(data.pista.id);
        setManualCode('');
      } else {
        setMessage({ type: 'error', text: data.mensagem });
      }

      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao validar código' });
    }
  };

  const handleScan = (code: string) => {
    setShowScanner(false);
    handleValidate(code);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.trim()) {
      handleValidate(manualCode.trim());
    }
  };

  const resetProgress = () => {
    if (confirm('⚠️ ATENÇÃO: Tem certeza que deseja reiniciar TODO o progresso?')) {
      if (confirm('🔴 CONFIRMAÇÃO FINAL: Esta ação não pode ser desfeita. Deseja continuar?')) {
        localStorage.removeItem('pistasEncontradas');
        setPistasEncontradas([]);
        setMessage({ type: 'success', text: 'Progresso reiniciado com sucesso!' });
        setTimeout(() => setMessage(null), 3000);
      }
    }
  };

  const totalEncontradas = pistasEncontradas.length;
  const totalPistas = pistas.length;
  const progresso = totalPistas > 0 ? (totalEncontradas / totalPistas) * 100 : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-indigo-900 mb-2">
            Missão SIG no Campo
          </h1>
          <p className="text-center text-gray-600 mb-4">Caça ao Tesouro</p>
          
          {/* Barra de Progresso */}
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div
              className="bg-linear-to-r from-green-400 to-green-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progresso}%` }}
            ></div>
          </div>
          <p className="text-center text-sm text-gray-600">
            {totalEncontradas} de {totalPistas} locais encontrados
          </p>
        </div>

        {/* Mensagem de Feedback */}
        {message && (
          <div
            className={`rounded-lg p-4 mb-6 ${
              message.type === 'success'
                ? 'bg-green-100 text-green-800 border border-green-300'
                : 'bg-red-100 text-red-800 border border-red-300'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Botões de Ação */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setShowScanner(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg transition-colors flex items-center justify-center gap-2"
          >
            <span className="text-2xl">📷</span>
            Escanear QR Code
          </button>
          <button
            onClick={resetProgress}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg transition-colors"
          >
            Reiniciar Progresso
          </button>
        </div>

        {/* Formulário de Código Manual */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 ">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Ou insira o código manualmente:</h2>
          <form onSubmit={handleManualSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value.toUpperCase())}
              placeholder="Digite o código"
              className="flex-1 px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors w-full sm:w-auto"
            >
              Validar
            </button>
          </form>
        </div>

        {/* Mapa dos Locais */}
        <div className="mb-6">
          <Mapa pistas={pistas} pistasEncontradas={pistasEncontradas} />
        </div>

        {/* Lista de Pistas */}
        <div className="space-y-4">
          {pistas.map((pista) => {
            const encontrada = pistasEncontradas.includes(pista.id);
            return (
              <div
                key={pista.id}
                className={`bg-white rounded-lg shadow-lg p-6 transition-all ${
                  encontrada ? 'ring-4 ring-green-400' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-indigo-600 text-white font-bold px-3 py-1 rounded-full text-sm">
                        {pista.ordem}
                      </span>
                      <h3 className="text-xl font-bold text-gray-800">{pista.titulo}</h3>
                    </div>
                  </div>
                  {encontrada && (
                    <span className="text-4xl">✅</span>
                  )}
                </div>
                <p className="text-gray-700 leading-relaxed">{pista.descricao}</p>
                {encontrada && (
                  <div className="mt-3 bg-green-50 border-l-4 border-green-500 p-3 rounded">
                    <p className="text-green-800 font-semibold">✓ Local encontrado!</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal de Conclusão */}
      {showModalConclusao && (
        <ModalConclusao
          onClose={() => setShowModalConclusao(false)}
          onReset={resetProgress}
        />
      )}

      {/* Scanner Modal */}
      {showScanner && (
        <QRScanner
          onScan={handleScan}
          onClose={() => setShowScanner(false)}
        />
      )}
    </div>
  );
}
