import { Routes, Route } from 'react-router-dom';

// Layout
import { DashboardLayout } from '../layout';

// Pages
import { Home } from '../pages/home';
import { Results } from '../pages/results';
import { Variations } from '../pages/variations';
import { Analyzes } from '../pages/analyzes';
import { Despesas } from '../pages/despesas';

export const Router = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="resultados" element={<Results />} />
        <Route path="variacoes" element={<Variations />} />
        <Route path="analises" element={<Analyzes />} />
        <Route path="despesas" element={<Despesas />} />
      </Route>
    </Routes>
  );
};
