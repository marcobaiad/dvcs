import React from 'react';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';


export default function RegSeller({ datos, onChangeHandler, tablasChange, getDatos }) {

    const btnCerrar = React.useRef(null);
    const form = React.useRef();
    const [contraseña, setContraseña] = React.useState('');

    const alertEdit = async () => {
        Swal.fire({
            title: "¿Estás seguro de guardar los Cambios?",
            showDenyButton: true,
            confirmButtonText: `Guardar`,
            denyButtonText: `Cancelar`,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Guardado!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000
                })
                editVentasHandler();
                btnCerrar.current.click();
            } else if (result.isDenied) {
                Swal.fire({
                    title: 'Cambios Descartados!',
                    icon: 'info',
                    showConfirmButton: false,
                    timer: 1000
                })
            }
        })
    }

    const editVentasHandler = async () => {
        if (contraseña !== '') {
            datos.password !== contraseña && Swal.fire({
                title: 'Las contraseñas deben coincidir!',
                icon: 'error',
                showConfirmButton: false,
                timer: 1000
            })
        }
        try {
            tablasChange ?
                await clienteAxios.put(`api/v1/salesupdate/${datos._id}`, datos)
                :
                await clienteAxios.put(`api/v1/sellerupdate/${datos._id}`, datos);
            form.current.reset();
            getDatos();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="modal" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center" id="exampleModalLabel">Editar {tablasChange ? 'Venta ' + datos.date : 'Vendedor ' + datos.user}</h5>
                            <button type="button" ref={btnCerrar} onClick={() => form.current.reset()} className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="row justify-content-center" ref={form}>
                                {
                                    tablasChange ?
                                        <>
                                            <div className="form-group row">
                                                <div className="col text-center">
                                                    <label htmlFor="nombrefull">Nombre</label>
                                                    <input type="text" id="nombrefull" className="form-control text-center" placeholder="Nombre Completo" name="nameClient" onChange={onChangeHandler} value={datos.nameClient} />
                                                </div>
                                                <div className="col text-center">
                                                    <label htmlFor="number">DNI</label>
                                                    <input type="text" id="number" className="form-control text-center" placeholder="Número de Teléfono" name="dniClient" onChange={onChangeHandler} value={datos.dniClient} />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col text-center">
                                                    <label htmlFor="dia">Teléfono</label>
                                                    <input type="text" id="dia" className="form-control text-center" placeholder="Día" name="celphoneClient" onChange={onChangeHandler} value={datos.celphoneClient} />
                                                </div>
                                                <div className="col text-center">
                                                    <label htmlFor="cuotas">Tipo Venta</label>
                                                    <input type="text" id="cuotas" className="form-control text-center" placeholder="Tipo de Credito" name="creditLine" onChange={onChangeHandler} value={datos.creditLine} />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col text-center">
                                                    <label htmlFor="montoC">Monto Crédito</label>
                                                    <input type="text" id="montoC" className="form-control text-center" placeholder="Número de Teléfono" name="amountApproved" onChange={onChangeHandler} value={datos.amountApproved} />
                                                </div>
                                                <div className="col text-center">
                                                    <label htmlFor="mcuotas">Numero cuotas</label>
                                                    <input type="text" id="mcuotas" className="form-control text-center" placeholder="N° de Cuotas" name="quantityQuotas" onChange={onChangeHandler} value={datos.quantityQuotas} />
                                                </div>
                                            </div>
                                            <div className="form-group row" style={{ width: "93%" }}>
                                                <div className="col text-center">
                                                    <label htmlFor="monto">Monto Cuota</label>
                                                    <input type="text" id="monto" className="form-control text-center" placeholder="Monto de Cuotas" name="quotaAmount" onChange={onChangeHandler} value={datos.quotaAmount} />
                                                </div>
                                                <div className="col text-center">
                                                    <label htmlFor="enable">Habilitado</label>
                                                    <select className="custom-select" as="select" name="enable" onChange={onChangeHandler}>
                                                        <option value="SI">SI</option>
                                                        <option value="NO">NO</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-12 text-center">
                                                <label htmlFor="saleDetail">Observación</label>
                                                <textarea rows="1" type="text" id="saleDetail" className="form-control text-center" placeholder={`${datos.saleDetail ? 'Cambiar Observación' : 'No existe observación'}`} name="saleDetail" onChange={onChangeHandler} value={datos.saleDetail} />
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div className="form-group row">
                                                <div className="col text-center">
                                                    <label htmlFor="fullname">Nombre</label>
                                                    <input type="text" id="fullname" className="form-control text-center" placeholder="Nombre Completo" name="fullname" onChange={onChangeHandler} value={datos.fullname} />
                                                </div>
                                                <div className="col text-center">
                                                    <label htmlFor="dni">DNI</label>
                                                    <input type="text" maxLength="8" minLength="7" id="dni" className="form-control text-center" placeholder="Número de Teléfono" name="dni" onChange={onChangeHandler} value={datos.dni} />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col text-center">
                                                    <label htmlFor="email">Email</label>
                                                    <input type="text" id="email" className="form-control text-center" placeholder="Día" name="email" onChange={onChangeHandler} value={datos.email} />
                                                </div>
                                                <div className="col text-center">
                                                    <label htmlFor="celphone">Teléfono</label>
                                                    <input type="text" id="celphone" className="form-control text-center" placeholder="Día" name="celphone" onChange={onChangeHandler} value={datos.celphone} />
                                                </div>
                                            </div>
                                            <div className="form-group row" style={{ width: "93%" }}>
                                                <div className="col text-center">
                                                    <label htmlFor="address">Dirección</label>
                                                    <input type="text" id="address" className="form-control text-center" placeholder="Dirección" name="address" onChange={onChangeHandler} value={datos.address} />
                                                </div>
                                                <div className="col text-center">
                                                    <label htmlFor="enable">Habilitado</label>
                                                    <select className="form-control" as="select" name="enable" onChange={onChangeHandler}>
                                                        <option value="SI" selected={datos.enable == 'SI'}>SI</option>
                                                        <option value="NO">NO</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <button className="btn btn-link btn-block collapsed" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                                    Cambiar Contraseña
                                                </button>
                                                <div className="collapse" id="collapseExample">
                                                    <div className="form-group row">
                                                        <div className="col text-center">
                                                            <label htmlFor="password">Contraseña</label>
                                                            <input type="text" id="password" className="form-control text-center" placeholder="Contraseña" name="password" onChange={onChangeHandler} />
                                                        </div>
                                                        <div className="col text-center">
                                                            <label htmlFor="repeatPassword">Repetir Contraseña</label>
                                                            <input type="text" id="repeatPassword" className="form-control text-center" placeholder="Repetir Contraseña" name="repeatPassword" onChange={e => setContraseña(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                }
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={alertEdit}>Guardar</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};