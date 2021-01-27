import React from 'react'
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

const AdminSaleModal = ({ datos, getDatos }) => {

    const [dataName, setDataName] = React.useState([]);
    const [options, setOptions] = React.useState([]);
    const [pdf, setPdf] = React.useState(null);
    const [sellerForm, setSellerForm] = React.useState({});
    const cerrarModal = React.useRef();
    const resetForm = React.useRef();
    const [enviando, setEnviando] = React.useState(false);
    const [selectCredit, setSelectCredit] = React.useState(true);


    const optionsNameSellers = () => {
        let opciones = datos && dataName.map(o => <option key={o._id} value={o.fullname}>{o.fullname}</option>)
        setOptions(opciones)
    }

    React.useEffect(() => {
        setDataName(datos);
    }, [datos]);

    React.useEffect(() => {
        optionsNameSellers()
    }, [dataName]);


    const actualizarState = e => {
        let texto = e.target.value.toUpperCase();
        setSellerForm({
            ...sellerForm, [e.target.name]: texto
        })
    }

    const crearNuevaVenta = async (e) => {
        e.preventDefault();
        setEnviando(true);
        if (pdf.type !== "application/pdf") {
            Swal.fire({
                icon: 'error',
                title: 'Solo se admite archivos formato PDF',
                showConfirmButton: false,
                timer: 1500
            })
            return
        }
        if (sellerForm['creditLine'] == undefined) {
            Swal.fire({
                title: 'El campo "Linea de Crédito" es requerido',
                text: 'Por favor, deberás completar correctamente el formulario para poder realizar la venta',
                icon: 'info',
                showConfirmButton: true
            })
            setEnviando(false);
            return
        }
        if (sellerForm['typeOperation'] == undefined) {
            Swal.fire({
                title: 'El campo "Tipo de Operación" es requerido',
                text: 'Por favor, deberás completar correctamente el formulario para poder realizar la venta',
                icon: 'info',
                showConfirmButton: true
            })
            setEnviando(false);
            return
        }
        if (sellerForm['newClient'] == undefined) {
            Swal.fire({
                title: 'El campo "Cliente Nuevo" es requerido',
                text: 'Por favor, deberás completar correctamente el formulario para poder realizar la venta',
                icon: 'info',
                showConfirmButton: true
            })
            setEnviando(false);
            return
        }
        if (sellerForm['fullname'] == undefined) {
            Swal.fire({
                title: 'El campo "Vendedor" es requerido',
                text: 'Por favor, deberás completar correctamente el formulario para poder realizar la venta',
                icon: 'info',
                showConfirmButton: true
            })
            setEnviando(false);
            return
        }

        try {

            const NewSales = await clienteAxios.post('api/v1/regsales', sellerForm);
            const formData = new FormData()
            formData.append('myFile', pdf)
            await clienteAxios.post(`api/v1/regsales/${NewSales.data.id}/sendpdf`, formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            Swal.fire({
                icon: 'success',
                title: 'Tu venta se cargo correctamente',
                showConfirmButton: false,
                timer: 1500
            });
            resetForm.current.reset();
            cerrarModal.current.click();
            getDatos();
            setEnviando(false);
        } catch (error) {
            const { response } = error;
            console.log(response);
            setEnviando(false);
            Swal.fire({
                icon: 'error',
                title: 'Ocurrió un error al querer cargar la venta',
                text: 'Por favor, intenta de nuevo más tarde',
                showConfirmButton: false,
                timer: 1500
            });
        }

    }

    const upload = e => {
        if (e.target.files[0].size <= 20000000) {
            let file = e.target.files[0];
            let reader = new FileReader()
            reader.readAsDataURL(file)
        } else {
            e.target.value = ''
            alert('subir algo min 2 mb')
        }
    }

    const OnlyNumber = (event) => {
        if (event.charCode <= 47) {
            Swal.fire({
                icon: 'error',
                title: 'Solo puede ingresar números'
            });
            return false
        }
        if (event.charCode >= 58) {
            Swal.fire({
                icon: 'error',
                title: 'Solo puede ingresar números',
            });
            return false
        }
    }

    const comprovePasteHandler = (e) => {
        isNaN(e.clipboardData.getData('Text')) && alert('No es un número')
        e.preventDefault()
    }

    const changeSelectTipeLine = () => {
        setSelectCredit(false)
    }

    React.useEffect(() => {
        sellerForm.creditLine === "OTRO" && changeSelectTipeLine();
    }, [sellerForm]);


    return (
        <>
            <div className="modal fade"
                id="admin-sale"
                tabIndex="-1"
                aria-labelledby="admin-sales"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="">
                            <h5 className="modal-title text-center mt-3" id="admin-sales">Nueva Venta</h5>
                            <hr />
                        </div>
                        <div className="modal-body">
                            <form onSubmit={crearNuevaVenta} ref={resetForm}>
                                <div className="form-row">
                                    <div className="form-group col-sm-6">
                                        <label htmlFor="inputStateCredito">Linea de Crédito *</label>
                                        {selectCredit ?
                                            <select required id="inputStateCredito" className="form-control" onChange={actualizarState} name="creditLine">
                                                <option hidden selected>Elegir...</option>
                                                <option value="Credito N° 1">Credito N° 1</option>
                                                <option value="Credito N° 2">Credito N° 2</option>
                                                <option value="Credito N° 3">Credito N° 3</option>
                                                <option value="Credito N° 4">Credito N° 4</option>
                                                <option value="otro">Otro...</option>
                                            </select>
                                            :
                                            <input className="form-control" placeholder="Crédito" name="creditLine" id="inputStateCredito" onChange={actualizarState} />
                                        }
                                    </div>
                                    <div className="form-group col-sm-6">
                                        <label htmlFor="inputStateOperacion">Indique tipo de operación *</label>
                                        <select required id="inputStateOperacion" className="form-control" onChange={actualizarState} name="typeOperation">
                                            <option hidden selected>Elegir...</option>
                                            <option value="credito">Crédito</option>
                                            <option value="electro">Electro</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-12 ">
                                        <label htmlFor="inputStateNew">Cliente Nuevo *</label>
                                        <select required id="inputStateNew" className="form-control" onChange={actualizarState} name="newClient">
                                            <option hidden selected>Elegir...</option>
                                            <option value="SI">Si</option>
                                            <option value="NO">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-sm-6">
                                        <label htmlFor="nombreCliente">Nombre del Cliente *</label>
                                        <input className="form-control"
                                            id="nombreCliente"
                                            name="nameClient"
                                            type="text"
                                            onChange={actualizarState}
                                            required
                                        />
                                    </div>
                                    <div className="form-group col-sm-6">
                                        <label htmlFor="dniCLiente">DNI del Cliente *</label>
                                        <input className="form-control"
                                            id="dniCLiente"
                                            name="dniClient"
                                            maxLength="8"
                                            minLength="7"
                                            type="text"
                                            onPaste={comprovePasteHandler}
                                            onKeyPress={OnlyNumber}
                                            onChange={actualizarState}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-sm-6">
                                        <label htmlFor="celularCLiente">Celular del Cliente *</label>
                                        <input className="form-control"
                                            id="celularCLiente"
                                            name="celphoneClient"
                                            type="text"
                                            onKeyPress={OnlyNumber}
                                            onPaste={comprovePasteHandler}
                                            onChange={actualizarState}
                                            required
                                        />
                                    </div>
                                    <div className="form-group col-sm-6">
                                        <label htmlFor="montoAprobado">Monto Aprobado *</label>
                                        <input className="form-control"
                                            id="montoAprobado"
                                            name="amountApproved"
                                            type="text"
                                            onPaste={comprovePasteHandler}
                                            onKeyPress={OnlyNumber}
                                            onChange={actualizarState}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-sm-6">
                                        <label htmlFor="inputStateCantidadCuotas">Cantidad de Cuotas *</label>
                                        <select required id="inputStateCantidadCuotas" className="form-control" onChange={actualizarState} name="quantityQuotas">
                                            <option value={0} hidden selected>Elegir...</option>
                                            <option value={1}>0</option>
                                            <option value={3}>3</option>
                                            <option value={6}>6</option>
                                            <option value={12}>12</option>
                                            <option value={15}>15</option>
                                            <option value={18}>18</option>
                                            <option value={24}>24</option>
                                            <option value={30}>30</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-sm-6">
                                        <label htmlFor="montoPorCuota">Monto por cuota *</label>
                                        <input className="form-control"
                                            id="montoPorCuota"
                                            name="quotaAmount"
                                            type="text"
                                            onPaste={comprovePasteHandler}
                                            onKeyPress={OnlyNumber}
                                            onChange={actualizarState}
                                            required
                                        />
                                    </div>
                                </div>
                                < div className="form-row" >
                                    <div className="form-group col-sm-6">
                                        <label htmlFor="message-text" className="col-form-label">Detalles de la operación</label>
                                        <textarea className="form-control"
                                            id="message-text"
                                            name="saleDetail"
                                            rows="1"
                                            onChange={actualizarState}
                                        >
                                        </textarea>
                                    </div>
                                    <div className="form-group col-sm-6">
                                        <label htmlFor="vendedor" className="col-form-label">Vendedor *</label>
                                        <select required id="vendedor" name="fullname" className="form-control" onChange={actualizarState}>
                                            <option selected disabledhidden selected>Elegir...</option>
                                            {options}
                                        </select>
                                    </div>
                                </div >
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlFile1">Seleccionar Archivo PDF</label>
                                    <input
                                        type="file"
                                        className="form-control-file"
                                        name='myFile'
                                        onChange={e => {
                                            setPdf(e.target.files[0])
                                            let file = e.target.files
                                            if (file.length === 1) {
                                                upload(e)
                                            } else {
                                                e.target.value = ''
                                                alert('cargar pdf')
                                            }
                                        }}
                                    />
                                </div>
                                <p>(*) Campo Obligatorio</p>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary"
                                        data-dismiss="modal"
                                        type="button"
                                        ref={cerrarModal}
                                        onClick={() => setEnviando(false)}
                                    >
                                        Cerrar
                                    </button>
                                    <div>
                                        {
                                            enviando ?
                                                <div className="spinner-border text-secondary" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                                :
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary"
                                                >Enviar</button>}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminSaleModal;