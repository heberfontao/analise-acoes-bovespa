import { useCallback, useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { TailSpin } from 'react-loader-spinner';

import { api } from '../../infra/api';

// constants
import { COMPANY_NAMES } from '../../constants';

export const Analyzes = () => {
  const [valuesAnalyze, setValuesAnalyze] = useState<any>(null);
  const [loader, setLoader] = useState<boolean>(true);
  const [errorApi, setErrorApi] = useState<boolean>(false);

  const [selectValueCompare, setSelectValuesCompare] = useState(
    COMPANY_NAMES[0],
  );

  // two lines
  const getAnalyze = useCallback(async () => {
    try {
      setLoader(true);
      const resp = await api.get(`v1/acao/${selectValueCompare}`);
      setValuesAnalyze(resp.data);
      setErrorApi(false);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      setErrorApi(true);
    }
  }, [selectValueCompare]);

  useEffect(() => {
    getAnalyze();
  }, [getAnalyze]);

  return (
    <>
      <div className="m-auto w-full 2xl:w-11/12 lg:w-11/12">
        <h1 className="font-bold text-center text-zinc-600 text-xl mb-4 mt-12">
          Análise fundamentalista de ações
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

        {valuesAnalyze && !errorApi && (
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
            <div className="2xl:grid xl:grid lg:grid  2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 gap-4">
              <div className="w-full bg-white p-6 border border-zinc-200 rounded-md mb-4 flex justify-center items-center flex-col gap-2">
                <div>
                  <h4 className="font-bold text-zinc-500">Preço atual</h4>
                  <h2 className="text-2xl">
                    <CurrencyFormat
                      value={valuesAnalyze.preco_atual}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'R$'}
                      renderText={(value: string) => (
                        <div>{value.replace('.', ',')}</div>
                      )}
                    />
                  </h2>
                </div>
                <div>
                  <p className="text-zinc-500 font-light text-sm">
                    Valor de cotação atual da ação.
                  </p>
                </div>
              </div>

              <div className="w-full bg-white p-6 border border-zinc-200 rounded-md mb-4 flex justify-center items-center flex-col gap-2">
                <div>
                  <h4 className="font-bold text-zinc-500">
                    Capitalização de mercado:
                  </h4>
                  <h2 className="text-2xl">
                    <CurrencyFormat
                      value={valuesAnalyze.capitalizacao_mercado}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'R$'}
                      renderText={(value: string) => (
                        <div>{value.replace(/,/g, '.')}</div>
                      )}
                    />
                  </h2>
                </div>

                <div>
                  <p className="text-zinc-500 font-light text-sm">
                    A capitalização de mercado é o valor total das ações em
                    circulação de uma empresa em determinado momento. É
                    calculada multiplicando o número de ações em circulação pelo
                    preço de cada ação individual.
                  </p>
                </div>
              </div>

              <div className="w-full bg-white p-6 border border-zinc-200 rounded-md mb-4 flex justify-center items-center flex-col gap-2">
                <div>
                  <h4 className="font-bold text-zinc-500">P/VPA</h4>
                  <h2 className="text-2xl">
                    <CurrencyFormat
                      value={valuesAnalyze.p_vpa}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'R$'}
                      renderText={(value: string) => (
                        <div>{value.replace('.', ',').substring(6, 0)}</div>
                      )}
                    />
                  </h2>
                </div>
                <div>
                  <p className="text-zinc-500 font-light text-sm">
                    O P/VPA corresponde ao preço de uma ação dividido pelo valor
                    patrimonial correspondente a ela, sendo esse o indicador que
                    diz o quanto os investidores estão dispostos a pagar pelo
                    patrimônio líquido da empresa.
                  </p>
                </div>
              </div>

              <div className="w-full bg-white p-6 border border-zinc-200 rounded-md mb-4 flex justify-center items-center flex-col gap-2">
                <div>
                  <h4 className="font-bold text-zinc-500">Preço por lucro</h4>
                  <h2 className="text-2xl">
                    <CurrencyFormat
                      value={valuesAnalyze.relacao_preco_lucro}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'R$'}
                      renderText={(value: string) => (
                        <div>{value.replace('.', ',').substring(6, 0)}</div>
                      )}
                    />
                  </h2>
                </div>
                <div>
                  <p className="text-zinc-500 font-light text-sm">
                    O índice preço/lucro (P/L) é um indicador financeiro formado
                    pela relação entre o preço atual de uma ação dividida pelo
                    lucro por ação desse ativo.
                  </p>
                </div>
              </div>

              <div className="w-full bg-white p-6 border border-zinc-200 rounded-md mb-4 flex justify-center items-center flex-col gap-2">
                <div>
                  <h4 className="font-bold text-zinc-500">ROE</h4>
                  <h2 className="text-2xl">
                    <CurrencyFormat
                      value={valuesAnalyze.roe}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'R$'}
                      renderText={(value: string) => (
                        <div>{value.replace('.', ',').substring(6, 0)}</div>
                      )}
                    />
                  </h2>
                </div>
                <div>
                  <p className="text-zinc-500 font-light text-sm">
                    O ROE é um indicador que mede a capacidade que uma empresa
                    tem de gerar valor ao negócio e aos investidores com base
                    nos recursos que a própria empresa possui. A sigla ROE vem
                    do inglês “Return On Equity”, que significa em português
                    “Retorno Sobre o Patrimônio Líquido”.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
