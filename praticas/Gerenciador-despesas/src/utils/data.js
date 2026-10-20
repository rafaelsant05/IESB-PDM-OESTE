

export function getDataFormatada(data) {
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  return `${dia}/${mes}/${data.getFullYear()}`;
}

export function getDiasAtras(data, dias) {
  const nova = new Date(data);
  nova.setDate(nova.getDate() - dias);
  return nova;
}