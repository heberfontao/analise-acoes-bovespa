import { Link } from 'react-router-dom';
import { FcComboChart } from 'react-icons/fc';

export const Header = () => {
  return (
    <>
      <Link
        to="/"
        className="text-white text-xs p-4 mb-4 bg-zinc-900 2xl:hidden xl:hidden lg:hidden md:hidden justify-center items-center flex"
      >
        <FcComboChart className="mr-2 text-lg" /> Sistema de Analise de Dados
      </Link>

      <header className="bg-white shadow-md mb-6 rounded-lg w-full h-14 flex justify-center">
        <div className="w-full flex 2xl:justify-between xl:justify-between lg:justify-between md:justify-between justify-center items-center h-full">
          <Link
            to="/"
            className="xl:px-4 px-2 text-white text-xs bg-zinc-900 h-full 2xl:flex xl:flex lg:flex md:flex justify-center items-center hidden font-bold"
          >
            <FcComboChart className="mr-2 text-lg" />
            ANÁLISE DE DADOS
          </Link>

          <div className="flex h-full">
            <Link
              to="resultados"
              className="border-r border-r-zinc-200 hover:bg-zinc-800 h-full flex items-center hover:text-white font-bold text-xs px-2 text-zinc-600"
            >
              RESULTADOS
            </Link>
            <Link
              to="variacoes"
              className="border-r border-r-zinc-200 hover:bg-zinc-800 h-full flex items-center hover:text-white text-xs font-bold px-2 text-zinc-600"
            >
              VARIAÇÕES
            </Link>
            <Link
              to="analises"
              className="border-r border-r-zinc-200 hover:bg-zinc-800 h-full flex items-center hover:text-white text-xs font-bold px-2 text-zinc-600"
            >
              ANÁLISES
            </Link>
            <Link
              to="despesas"
              className="border-r border-r-zinc-200 hover:bg-zinc-800 h-full flex items-center hover:text-white text-xs font-bold px-2 text-zinc-600"
            >
              DESPESAS
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};
