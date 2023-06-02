import { useCallback, useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { api } from '../../infra/api';

// constants
import { COMPANY_NAMES } from '../../constants';
import { LineChartMulti } from '../../components/LineChartMulti';

export const Variations = () => {
  const [valuesCompare, setValuesCompare] = useState(null);
  const [loader, setLoader] = useState<boolean>(true);
  const [errorApi, setErrorApi] = useState<boolean>(false);

  const [selectValueCompare, setSelectValuesCompare] = useState(
    COMPANY_NAMES[0],
  );

  // two lines
  const getDataCompare = useCallback(async () => {
    try {
      const resp = await api.get(
        `v1/indicadores/${selectValueCompare}/Adj Close`,
      );
      setValuesCompare(resp.data);
      setLoader(false);
      setErrorApi(false);
    } catch (error) {
      setLoader(false);
      setErrorApi(true);
    }
  }, [selectValueCompare]);

  useEffect(() => {
    getDataCompare();
  }, [getDataCompare]);

  return (
    <>
      <div className="m-auto w-full 2xl:w-11/12 lg:w-11/12">
        <h1 className="font-bold text-center text-zinc-600 text-xl mb-4 mt-12">
          Gráfico comparativo de variação de Ações x Índice BOVESPA
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

        {valuesCompare && !errorApi && (
          <>
            <div className="w-ful bg-white p-3 border border-zinc-200 rounded-md mb-4">
              <p className="text-zinc-500 text-sm mb-2">
                Selecione o ticker de uma empresa:
              </p>
              <select
                name="company_tickers"
                className="w-full  2xl:w-1/4 xl:w-1/4 border border-zinc-200 p-3"
                onChange={(e: any) => setSelectValuesCompare(e.target.value)}
              >
                {COMPANY_NAMES.map((ticker, index) => (
                  <option key={index} value={ticker}>
                    {ticker}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full bg-white p-3 border border-zinc-200 rounded-md">
              <LineChartMulti
                chartValues={valuesCompare}
                title={selectValueCompare}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};
