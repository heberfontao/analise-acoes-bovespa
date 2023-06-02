import { useCallback, useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { api } from '../../infra/api';
import { LineChart } from '../../components/LineChart';

// constants
import { COMPANY_NAMES } from '../../constants';

export const Results = () => {
  const [valuesEvolution, setValuesEvolution] = useState(null);
  const [loader, setLoader] = useState<boolean>(true);
  const [errorApi, setErrorApi] = useState<boolean>(false);

  const [selectValueEvolution, setSelectValuesEvolution] = useState(
    COMPANY_NAMES[0],
  );

  // on line
  const getDataLineEvolution = useCallback(async () => {
    try {
      setLoader(true);
      const resp = await api.get(
        `v1/dados?empresa=${selectValueEvolution}&coluna=Lucro/Prejuizo do Periodo`,
      );
      setValuesEvolution(resp.data);
      setLoader(false);
      setErrorApi(false);
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
          Gráfico de evolução de Lucro/Prejuízo do período
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

        {valuesEvolution && !errorApi && (
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
            <div className="w-full bg-white p-3 border border-zinc-200 rounded-md">
              <LineChart
                chartValues={valuesEvolution}
                title={selectValueEvolution}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};
