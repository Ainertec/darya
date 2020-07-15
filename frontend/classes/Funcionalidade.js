//funcao responsavel por criar alerta
function alertaConfirmacao() {
    let codigoHTML = ``

    codigoHTML += `<div class="modal" id="alertaConfirmacao" data-backdrop="static" data-keyboard="false" role="dialog" aria-hidden="true">
    <div class="modal-dialog float-left">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>`



    document.getElementById('alert2').innerHTML = codigoHTML;

    $('#alertaConfirmacao').modal('show')
}