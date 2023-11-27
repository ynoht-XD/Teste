const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sData = document.querySelector('#m-data')
const sEntrada = document.querySelector('#m-entrada')
const sAuditorio = document.querySelector('#m-auditorio')
const sVolante = document.querySelector('#m-volante')
const sAv = document.querySelector('#m-av')
const sPalco = document.querySelector('#m-palco')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sData.value = itens[index].data
    sEntrada.value = itens[index].entrada
    sAuditorio.value = itens[index].auditorio
    sVolante.value = itens[index].volante
    sAv.value = itens[index].av
    sPalco.value = itens[index].palco
    id = index
  } else {
    sData.value = ''
    sEntrada.value = ''
    sAuditorio.value = ''
    sVolante.value = ''
    sAv.value = ''
    sPalco.value = ''

  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.data}</td>
    <td>${item.entrada}</td>
    <td>${item.auditorio}</td>
    <td>${item.volante}</td>
    <td>${item.av}</td>
    <td>${item.palco}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sData.value == '' || sEntrada.value == '' || sAuditorio.value == '' || sVolante.value == '' || sAv.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].data = sData.value
    itens[id].entrada = sEntrada.value
    itens[id].auditorio = sAuditorio.value
    itens[id].volante = sVolante.value
    itens[id].av = sAv.value
    itens[id].palco = sPalco.value
  } else {
    itens.push({'data': sData.value, 'entrada': sEntrada.value, 'auditorio': sAuditorio.value , 'volante': sVolante.value , 'av': sAv.value , 'palco': sPalco.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
