'use client';

interface ModalConclusaoProps {
  onClose: () => void;
  onReset: () => void;
}

export default function ModalConclusao({ onClose, onReset }: ModalConclusaoProps) {
  const handleReset = () => {
    if (confirm('Tem certeza que deseja reiniciar TODO o progresso? Esta ação não pode ser desfeita.')) {
      if (confirm('CONFIRMAÇÃO FINAL: Todos os locais encontrados serão perdidos. Deseja continuar?')) {
        onReset();
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden animate-scaleIn">
        {/* Header com Confete */}
        <div className="bg-linear-to-r from-yellow-400 via-orange-400 to-yellow-500 p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="confetti">🎉</div>
            <div className="confetti">🎊</div>
            <div className="confetti">⭐</div>
            <div className="confetti">✨</div>
            <div className="confetti">🏆</div>
          </div>
          <h2 className="text-4xl font-bold text-white mb-2 relative z-10 drop-shadow-lg">
            🎉 MISSÃO COMPLETA! 🎉
          </h2>
          <p className="text-xl text-white font-semibold relative z-10 drop-shadow">
            Parabéns, Geoprocessador!
          </p>
        </div>

        {/* Conteúdo */}
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Você completou a Missão SIG no Campo!
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Todos os <strong>6 locais</strong> foram encontrados com sucesso!
            </p>
            
            <div className="bg-linear-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6 mb-6">
              <p className="text-green-800 font-semibold text-lg mb-2">
                ✓ DATUM INICIAL encontrado
              </p>
              <p className="text-green-800 font-semibold text-lg mb-2">
                ✓ ALVO DE CLASSIFICAÇÃO encontrado
              </p>
              <p className="text-green-800 font-semibold text-lg mb-2">
                ✓ BUFFER DE INUNDAÇÃO encontrado
              </p>
              <p className="text-green-800 font-semibold text-lg mb-2">
                ✓ VETOR DA ARQUITETURA encontrado
              </p>
              <p className="text-green-800 font-semibold text-lg mb-2">
                ✓ PIXEL DA TRADIÇÃO encontrado
              </p>
              <p className="text-green-800 font-semibold text-lg">
                ✓ CENTRÓIDE NORDESTINO encontrado
              </p>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 mb-6">
              <p className="text-yellow-800 font-bold text-lg">
                🎁 Seu tesouro: Quatro fichas para aproveitar!
              </p>
              <p className="text-yellow-700 mt-2">
                O Datum Ceará espera por você!
              </p>
            </div>

            <p className="text-gray-600 italic text-lg">
              A missão de mapeamento está completa. <strong>PROSIT!</strong> 🍻
            </p>
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onClose}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-lg transition-colors shadow-lg"
            >
              Fechar
            </button>
            <button
              onClick={handleReset}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-lg transition-colors shadow-lg"
            >
              Reiniciar Desafio
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }

        .confetti {
          position: absolute;
          font-size: 2rem;
          animation: fall 3s linear infinite;
        }

        .confetti:nth-child(1) {
          left: 10%;
          animation-delay: 0s;
        }

        .confetti:nth-child(2) {
          left: 30%;
          animation-delay: 0.5s;
        }

        .confetti:nth-child(3) {
          left: 50%;
          animation-delay: 1s;
        }

        .confetti:nth-child(4) {
          left: 70%;
          animation-delay: 1.5s;
        }

        .confetti:nth-child(5) {
          left: 90%;
          animation-delay: 2s;
        }

        @keyframes fall {
          0% {
            top: -10%;
            transform: rotate(0deg);
          }
          100% {
            top: 110%;
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
