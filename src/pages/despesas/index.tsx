import { useCallback, useEffect, useState } from 'react';
import { api } from '../../infra/api';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { TailSpin } from 'react-loader-spinner';

// constants
import { COMPANY_NAMES } from '../../constants';

export const Despesas = () => {
  const [valuesPie, setValuesPie] = useState<any>(null);
  const [loader, setLoader] = useState<boolean>(true);
  const [errorApi, setErrorApi] = useState<boolean>(false);

  const [selectValueEvolution, setSelectValuesEvolution] = useState(
    COMPANY_NAMES[0],
  );

  ChartJS.register(ArcElement, Tooltip, Legend);

  // on line
  const getDataLineEvolution = useCallback(async () => {
    try {
      setLoader(true);
      const resp = await api.get(`v1/dados/${selectValueEvolution}`);
      const respFilterByDate = resp.data.filter(
        (value: any) => value.Data === '31/12/2022',
      );
      setValuesPie(respFilterByDate[0]);
      setErrorApi(false);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      setErrorApi(true);
    }
  }, [selectValueEvolution]);

  useEffect(() => {
    getDataLineEvolution();
  }, [getDataLineEvolution]);

  return (
    <>
      <div className="m-auto w-full 2xl:w-11/12 lg:w-11/12">
        <h1 className="font-bold text-center text-zinc-600 text-xl mb-4">
          Gráfico de distribuição das despesas
        </h1>

        {errorApi && (
          <div className="w-full text-center my-4">
            <p className="text-red-800 font-bold">
              Ocorreu um erro, tente novamente.
            </p>
          </div>
        )}

        {loader && (
          <div className="m-auto flex justify-center">
            <TailSpin
              height="50"
              width="50"
              color="#069"
              ariaLabel="tail-spin-loading"
              radius="1"
              visible={true}
            />
          </div>
        )}

        {valuesPie && !errorApi && (
          <>
            <div className="w-ful bg-white p-3 border border-zinc-200 rounded-md mb-4">
              <p className="text-zinc-500 text-sm mb-2">
                Selecione o ticker de uma empresa:
              </p>
              <select
                name="company_tickers"
                className="w-full  2xl:w-1/4 xl:w-1/4 border border-zinc-200 p-3"
                onChange={(e: any) => setSelectValuesEvolution(e.target.value)}
              >
                {COMPANY_NAMES.map((ticker, index) => (
                  <option key={index} value={ticker}>
                    {ticker}
                  </option>
                ))}
              </select>
            </div>

            <div className="2xl:w-1/2 xl:w-1/2 lgxl:w-1/2 w-full  m-auto bg-white p-3 border border-zinc-200 rounded-md">
              <Pie
                data={{
                  labels: [
                    'Despesas Com Vendas',
                    'Despesas Gerais e Administrativas',
                    'Outras Despesas Operacionais',
                    'Despesas Financeiras',
                  ],
                  datasets: [
                    {
                      label: '',
                      data: [
                        valuesPie['Despesas Com Vendas'],
                        valuesPie['Despesas Gerais e Administrativas'],
                        valuesPie['Outras Despesas Operacionais'],
                        valuesPie['Despesas Financeiras'],
                      ],
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};
