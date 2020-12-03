import React from 'react';
import Swal from 'sweetalert2';

function RowsTable({ datosShow, onClickHandler, deleteSaleHandler, datosSellerShow, tablasChange, getDatos }) {

    const [obs, setObs] = React.useState('')

    const handlerObs = (props) => {
        setObs(props)
    }

    const alertDelete = (f) => {
        Swal.fire({
            title: "¿Estás seguro de Deshabilitar esta venta?",
            showDenyButton: true,
            confirmButtonText: `Confirmar`,
            denyButtonText: `Cancelar`,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: '¡Proceso Realizado con Exito!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000
                })
                deleteSaleHandler(f);
                getDatos();
            } else if (result.isDenied) {
                Swal.fire({
                    title: '¡Cambios Descartados!',
                    icon: 'info',
                    showConfirmButton: false,
                    timer: 1000
                })
            }
        })
    }

    const alertEnable = (f) => {
        Swal.fire({
            title: "¿Estás seguro de Habilitar esta venta?",
            showDenyButton: true,
            confirmButtonText: `Confirmar`,
            denyButtonText: `Cancelar`,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: '¡Proceso Realizado con Exito!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000
                })
                deleteSaleHandler(f);
                getDatos();
            } else if (result.isDenied) {
                Swal.fire({
                    title: '¡Cambios Descartados!',
                    icon: 'info',
                    showConfirmButton: false,
                    timer: 1000
                })
            }
        })
    }

    return (
        <>
            {
                tablasChange ?
                    datosShow.map(f =>
                        <tr key={f._id} id={f._id}>
                            <td className="py-1 text-nowrap" scope="row">{f.date}</td>
                            <td className="py-1 text-nowrap" colSpan="3">{f.nameClient}</td>
                            <td className="py-1 text-nowrap">{f.dniClient}</td>
                            <td className="py-1 text-nowrap">{f.celphoneClient}</td>
                            <td className="py-1 text-nowrap" colSpan="3">{f.fullname}</td>
                            <td className="py-1 text-nowrap">{f.creditLine}</td>
                            <td className="py-1 text-nowrap">${f.amountApproved}</td>
                            <td className="py-1 text-nowrap text-center">${f.quotaAmount}</td>
                            <td className="py-1 text-nowrap text-center">{f.quantityQuotas}</td>
                            <td className="py-1 text-nowrap text-center">{f.enable}</td>
                            <td className="py-1 text-nowrap text-center">{f.saleDetail ? <button className="btn btn-primary py-0" onClick={() => handlerObs(f.saleDetail)} data-toggle="modal" data-target="#modalObservacion">Ver</button> : "-"}</td>
                            <td className="py-1 text-nowrap"><a data-toggle="modal" data-target="#exampleModal"><i className="fas fa-edit text-primary mx-1" role="button" tabIndex="0" onClick={() => onClickHandler(f)}></i></a>{f.enable == "SI" ? <i role="button" tabIndex="0" className="far fa-trash-alt text-danger mx-1" onClick={() => alertDelete(f)}></i> : <i className="fas fa-check text-success" onClick={() => alertEnable(f)}></i>}</td>
                        </tr>)
                    :
                    datosSellerShow.map(f =>
                        <tr key={f._id} id={f._id}>
                            <td className="py-1 text-nowrap" colSpan="3" scope="row">{f.fullname}</td>
                            <td className="py-1 text-nowrap">{f.dni}</td>
                            <td className="py-1 text-nowrap">{f.email}</td>
                            <td className="py-1 text-nowrap">{f.celphone}</td>
                            <td className="py-1 text-nowrap">{f.address}</td>
                            <td className="py-1 text-nowrap text-center">{f.enable}</td>
                            <td className="py-1 text-nowrap"><a data-toggle="modal" data-target="#exampleModal"><i className="fas fa-edit text-primary mx-1" role="button" tabIndex="0" onClick={() => onClickHandler(f)}></i></a>{f.enable == "SI" ? <i role="button" tabIndex="0" className="far fa-trash-alt text-danger mx-1" onClick={() => alertDelete(f)}></i> : <i className="fas fa-check text-success" onClick={() => alertEnable(f)}></i>}</td>
                        </tr>
                    )
            }
            <div className="modal fade" id="modalObservacion" tabIndex="-1" aria-labelledby="modalObservacionLabel" aria-hidden="true">
                <div className="modal-dialog modal-sm modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalObservacionLabel">Observación</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p className="text-break mb-0">{obs}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RowsTable;