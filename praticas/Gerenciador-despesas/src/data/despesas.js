import { getDiasAtras } from '../utils/data';

const hoje = new Date();

export const DESPESAS = [
  { id: 'd1', descricao: 'Supermercado', valor: 89.9,  data: getDiasAtras(hoje, 2),  categoria: 'Alimentação' },
  { id: 'd2', descricao: 'Uber',         valor: 25.5,  data: getDiasAtras(hoje, 3),  categoria: 'Transporte' },
  { id: 'd3', descricao: 'Cinema',       valor: 45.0,  data: getDiasAtras(hoje, 5),  categoria: 'Lazer' },
  { id: 'd4', descricao: 'Conta de luz', valor: 150.0, data: getDiasAtras(hoje, 20), categoria: 'Contas' },
  { id: 'd5', descricao: 'Restaurante',  valor: 62.3,  data: getDiasAtras(hoje, 1),  categoria: 'Alimentação' },
];