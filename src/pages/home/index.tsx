import { Link } from 'react-router-dom';
import {
  FcAreaChart,
  FcLineChart,
  FcDatabase,
  FcPieChart,
} from 'react-icons/fc';

// images
import BannerCharts from '../../assets/images/banner_charts.jpeg';

export const Home = () => {
  return (
    <>
      <img src={BannerCharts} alt="chart" className="w-full mb-12 rounded-md" />
      <div className="m-auto w-full 2xl:w-11/12 lg:w-11/12">
        <h1 className="font-bold text-center text-zinc-600 text-xl mb-4">
          Sistema de Analise de Dados das Ações do IBovespa
        </h1>

        <h1 className="font-bold text-center text-zinc-600 text-xl mb-8">
          Desenvolvido para auxiliar na tomada de decisão dos investidores
        </h1>

        <div className="w-full grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 gap-4">
          <Link
            to="resultados"
            className="bg-white border border-zinc-200 p-4 rounded-md flex gap-2 justify-center items-center border-b-4 border-b-cyan-600"
          >
            <FcAreaChart className="text-4xl" />
            <h2 className="font-bold text-lg text-cyan-700">RESULTADOS</h2>
          </Link>

          <Link
            to="variacoes"
            className="bg-white border border-zinc-200 p-4 rounded-md flex gap-2 justify-center items-center border-b-4 border-b-cyan-600"
          >
            <FcLineChart className="text-4xl" />
            <h2 className="font-bold text-lg text-cyan-700">VARIAÇÕES</h2>
          </Link>

          <Link
            to="analises"
            className="bg-white border border-zinc-200 p-4 rounded-md flex gap-2 justify-center items-center border-b-4 border-b-cyan-600"
          >
            <FcDatabase className="text-4xl" />
            <h2 className="font-bold text-lg text-cyan-700">ANÁLISES</h2>
          </Link>

          <Link
            to="despesas"
            className="bg-white border border-zinc-200 p-4 rounded-md flex gap-2 justify-center items-center border-b-4 border-b-cyan-600"
          >
            <FcPieChart className="text-4xl" />
            <h2 className="font-bold text-lg text-cyan-700">DESPESAS</h2>
          </Link>
        </div>
      </div>
    </>
  );
};
