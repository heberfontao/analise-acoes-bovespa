import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

// images
// import LogoRp from '../../../assets/images/logo-rp.webp';

export const DashboardLayout = () => {
  return (
    <>
      <div className="bg-slate-100 flex gap-4 p-4 overflow-hidden">
        <div className="flex-1 w-full">
          <Header />
          <main className="w-full min-h-screen bg-transparent m-auto">
            <Outlet />
          </main>
        </div>
      </div>

      <div className="clear-both"></div>

      <footer className="w-full bg-zinc-600 p-8 m-auto text-white flex justify-center items-center">
        <div>
          <p className="text-center text-sm mt-4 tracking-wider">
            TAPIRATIBA-PJI410-GRUPO-001 - UNIVESP
          </p>
        </div>
      </footer>
    </>
  );
};
