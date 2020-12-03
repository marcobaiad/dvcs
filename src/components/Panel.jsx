import React, { Suspense } from 'react';
import '../css/Panel.css';
import ModalEditSales from './ModalEditSales';
import clienteAxios from '../config/axios';
import AdminSaleModal from './AdminSaleModal';
import ModalRegAdminSeller from './ModalRegAdminSeller';
import Pagination from './Pagination';

// import RowsTable from './RowsTable';

const RowsTable = React.lazy(() => import('./RowsTable'));

export default function Panel() {

    const [tablasChange, setTablasChange] = React.useState(true);


    // Tabla 
    const [sellerDatos, setSellerDatos] = React.useState([]);
    const [datosSellerShow, setdatosSellerShow] = React.useState([]);
    const [montosTotales, setMontosTotales] = React.useState([]);
    const [montosTotalesShow, setMontosTotalesShow] = React.useState([]);

    // Tabla Ventas
    const [datosShow, setdatosShow] = React.useState([]);
    const [userDatos, setUserDatos] = React.useState([]);
    const [fila, setFila] = React.useState({});

    // Paginacion 
    const [limit, setLimit] = React.useState(20);
    const [page, setPage] = React.useState(1);
    const [datosRowsSales, setDatosRowsSales] = React.useState([]);
    const [datosRowsSellers, setDatosRowsSellers] = React.useState([]);
    const [paramsSales, setParamsSales] = React.useState({ enable: 'SI' })
    const [paramsSellers, setParamsSellers] = React.useState({ enable: 'SI' })


    const getDatos = async () => {
        try {
            const sellers = await clienteAxios.get(`api/v1/allseller`, {
                params: {
                    page: page,
                    limit: limit,
                    ...paramsSellers
                }
            });
            const amountTotals = await clienteAxios.get(`api/v1/montosales`);
            const ventas = await clienteAxios.get(`api/v1/allsales`, {
                params: {
                    page: page,
                    limit: limit,
                    ...paramsSales
                }
            })
            setMontosTotales(amountTotals.data);
            setMontosTotalesShow(amountTotals.data);
            // TablesSales
            setSellerDatos(sellers.data.docs);
            setdatosSellerShow(sellers.data.docs);
            setDatosRowsSellers(sellers.data);
            //TablesSales    
            setdatosShow(ventas.data.docs);
            setUserDatos(ventas.data.docs);
            setDatosRowsSales(ventas.data);

        } catch (error) {
            const { response } = error;
            console.log(response);
        }
    }

    // Sort's Table Sales

    const sortAmount = () => {
        let sortDatosAmount = [...userDatos].sort((a, b) => (b.amountApproved - a.amountApproved))
        if (sortDatosAmount[0] === datosShow[0])
            sortDatosAmount = [...userDatos].sort((b, a) => (b.amountApproved - a.amountApproved))
        setdatosShow(sortDatosAmount)
    }

    const sortDNI = () => {
        let sortdatos = [...userDatos].sort((a, b) => (b.dniClient - a.dniClient))
        if (sortdatos[0] === datosShow[0])
            sortdatos = [...userDatos].sort((b, a) => (b.dniClient - a.dniClient))
        setdatosShow(sortdatos);
    }

    const sortNombre = () => {
        let sortdatos = [...userDatos].sort((a, b) => (a.nameClient > b.nameClient ? 1 : a.nameClient < b.nameClient ? -1 : 0))
        if (sortdatos[0] === datosShow[0])
            sortdatos = [...userDatos].sort((b, a) => (a.nameClient > b.nameClient ? 1 : a.nameClient < b.nameClient ? -1 : 0))
        setdatosShow(sortdatos);
    }

    const sortMonto = () => {
        let sortdatos = [...userDatos].sort((a, b) => (a.quantityQuotas > b.quantityQuotas ? 1 : a.quantityQuotas < b.quantityQuotas ? -1 : 0))
        if (sortdatos[0] === datosShow[0])
            sortdatos = [...userDatos].sort((b, a) => (a.quantityQuotas > b.quantityQuotas ? 1 : a.quantityQuotas < b.quantityQuotas ? -1 : 0))
        setdatosShow(sortdatos);
    }

    const sortDia = () => {
        let sortdatos = [...userDatos].sort(function (a, b) {
            return (a.date > b.date ? 1 : a.date < b.date ? -1 : 0)
        })
        if (sortdatos[0] === datosShow[0])
            sortdatos = [...userDatos].sort(function (b, a) {
                return (a.date > b.date ? 1 : a.date < b.date ? -1 : 0)
            })
        if (sortdatos[0] === datosShow[0])
            sortdatos = [...userDatos].sort(function (b, a) {
                return (a.date > b.date ? 1 : a.date < b.date ? -1 : 0)
            })
        setdatosShow(sortdatos);
    }

    const sortNombreSeller = () => {
        let sortdatos = [...datosShow].sort((a, b) => (a.fullname > b.fullname ? 1 : a.fullname < b.fullname ? -1 : 0))
        if (sortdatos[0] === userDatos[0])
            sortdatos = [...datosShow].sort((b, a) => (a.fullname > b.fullname ? 1 : a.fullname < b.fullname ? -1 : 0))
        setdatosShow(sortdatos)
    }

    // Sort's Table Sellers

    const sortNombreS = () => {
        let sortdatos = [...sellerDatos].sort((a, b) => (a.fullname > b.fullname ? 1 : a.fullname < b.fullname ? -1 : 0))
        if (sortdatos[0] === datosSellerShow[0])
            sortdatos = [...sellerDatos].sort((b, a) => (a.fullname > b.fullname ? 1 : a.fullname < b.fullname ? -1 : 0))
        setdatosSellerShow(sortdatos);
    }

    const sortDNISe = () => {
        let sortdatos = [...sellerDatos].sort((a, b) => (b.dni - a.dni))
        if (sortdatos[0] === datosSellerShow[0])
            sortdatos = [...sellerDatos].sort((b, a) => (b.dni - a.dni))
        setdatosSellerShow(sortdatos);
    }

    const sortEmails = () => {
        let sortdatos = [...sellerDatos].sort((a, b) => (a.email > b.email ? 1 : a.email < b.email ? -1 : 0))
        if (sortdatos[0] === datosSellerShow[0])
            sortdatos = [...sellerDatos].sort((b, a) => (a.email > b.email ? 1 : a.email < b.email ? -1 : 0))
        setdatosSellerShow(sortdatos);
    }

    const search = (e) => {
        const Filtrados = [];
        let texto = e.target.value.toUpperCase();
        for (let montos of montosTotales) {
            let name = montos.seller.fullname;
            let dni = montos.seller.dni.toString();
            let year = montos.year;
            if (name.indexOf(texto) !== -1 || dni.indexOf(texto) !== -1 || year.indexOf(texto) !== -1) {
                Filtrados.push(montos);
                setMontosTotalesShow(Filtrados.map(f => f))
            }
        }
    }

    React.useEffect(() => {
        getDatos();
    }, [limit, page, paramsSales.enable, paramsSellers.enable]);

    // Paginate

    const handlePaginate = (n) => {
        setPage(n);
    }

    const handlePaginateNext = (n) => {
        tablasChange ? datosRowsSales.hasNextPage && setPage(n)
            :
            datosRowsSellers.hasNextPage && setPage(n);
    }

    const handlePaginatePrev = (n) => {
        tablasChange ? datosRowsSales.hasPrevPage && setPage(n)
            :
            datosRowsSellers.hasPrevPage && setPage(n);
    }

    const handleChangeRows = (n) => {
        setLimit(n);
    }

    const parameterSalesHandler = (e) => {
        let texto = e.target.value.toUpperCase();
        setParamsSales({ ...paramsSales, [e.target.name]: texto });
    }

    const parameterSellerHandler = (e) => {
        let texto = e.target.value.toUpperCase();
        setParamsSellers({ ...paramsSellers, [e.target.name]: texto });
    }

    const enterSearch = (e) => {
        if (paramsSales[e.target.name] === '') {
            if (e.target.value.length < 1) {
                delete paramsSales[e.target.name]
            }
        }
        if (paramsSellers[e.target.name] === '') {
            if (e.target.value.length < 1) {
                delete paramsSellers[e.target.name]
            }
        }
        if (e.keyCode === 13) {
            e.preventDefault();
            getDatos();
        }
    }

    // Fin Paginate

    const onClickHandler = (datoFila) => {
        setFila(datoFila);
    }

    const onChangeHandler = (e) => {
        let texto = e.target.value.toUpperCase();
        let pass = e.target.value;
        if (e.target.name === "password") {
            setFila({ ...fila, [e.target.name]: pass })
        } else {
            setFila({ ...fila, [e.target.name]: texto })
        }
    }

    const deleteSaleHandler = async (props) => {
        try {
            tablasChange ?
                await clienteAxios.put(`api/v1/salesupdate/${props._id}`, { enable: props.enable === "SI" ? "NO" : "SI" })
                :
                await clienteAxios.put(`api/v1/sellerupdate/${props._id}`, { enable: props.enable === "SI" ? "NO" : "SI" })
        } catch (error) {
            const { response } = error;
            console.log(response);
        }
    }

    const annual = []
    const month = []
    const sumSales = []

    const mes = new Date().toLocaleString('default', { month: 'long' })
    const año = new Date().toLocaleString('default', { year: 'numeric' })


    for (let monto of montosTotales) {
        const annualsAmmounts = monto.annualAmountApproved;
        const monthAmmountsEnero = monto.enero;
        const monthAmmountsFebrero = monto.febrero;
        const monthAmmountsMarzo = monto.marzo;
        const monthAmmountsAbril = monto.abril;
        const monthAmmountsMayo = monto.mayo;
        const monthAmmountsJunio = monto.junio;
        const monthAmmountsJulio = monto.julio;
        const monthAmmountsAgosto = monto.agosto;
        const monthAmmountsSeptiembre = monto.septiembre;
        const monthAmmountsOctubre = monto.octubre;
        const monthAmmountsNoviembre = monto.noviembre;
        const monthAmmountsDiciembre = monto.diciembre;

        const ventasEnero = monto.ventasEnero;
        const ventasFebrero = monto.ventasFebrero;
        const ventasMarzo = monto.ventasMarzo;
        const ventasAbril = monto.ventasAbril;
        const ventasMayo = monto.ventasMayo;
        const ventasJunio = monto.ventasJunio;
        const ventasJulio = monto.ventasJulio;
        const ventasAgosto = monto.ventasAgosto;
        const ventasSeptiembre = monto.ventasSeptiembre;
        const ventasOctubre = monto.ventasOctubre;
        const ventasNoviembre = monto.ventasNoviembre;
        const ventasDiciembre = monto.ventasDiciembre;

        if (año == monto.year) {
            annual.push(annualsAmmounts);
        }
        if (mes == "enero" && monto.year == año) {
            month.push(monthAmmountsEnero);
            sumSales.push(ventasEnero);
        }
        if (mes == "febrero" && monto.year == año) {
            month.push(monthAmmountsFebrero);
            sumSales.push(ventasFebrero);
        }
        if (mes == "marzo" && monto.year == año) {
            month.push(monthAmmountsMarzo);
            sumSales.push(ventasMarzo);
        }
        if (mes == "abril" && monto.year == año) {
            month.push(monthAmmountsAbril);
            sumSales.push(ventasAbril);
        }
        if (mes == "mayo" && monto.year == año) {
            month.push(monthAmmountsMayo);
            sumSales.push(ventasMayo);
        }
        if (mes == "junio" && monto.year == año) {
            month.push(monthAmmountsJunio);
            sumSales.push(ventasJunio);
        }
        if (mes == "julio" && monto.year == año) {
            month.push(monthAmmountsJulio);
            sumSales.push(ventasJulio);
        }
        if (mes == "agosto" && monto.year == año) {
            month.push(monthAmmountsAgosto);
            sumSales.push(ventasAgosto);
        }
        if (mes == "septiembre" && monto.year == año) {
            month.push(monthAmmountsSeptiembre);
            sumSales.push(ventasSeptiembre);
        }
        if (mes == "octubre" && monto.year == año) {
            month.push(monthAmmountsOctubre);
            sumSales.push(ventasOctubre);
        }
        if (mes == "noviembre" && monto.year == año) {
            month.push(monthAmmountsNoviembre);
            sumSales.push(ventasNoviembre);
        }
        if (mes == "diciembre" && monto.year == año) {
            month.push(monthAmmountsDiciembre);
            sumSales.push(ventasDiciembre);
        }
    }

    return (
        <div className="my-5 container">
            <div className="my-3 row justify-content-between px-3 form-group">
                <h2>Panel Administrador</h2>
                <select className="custom-select col-12 col-md-4" as="select" onChange={e => tablasChange && e.target.value === 'false' ? setTablasChange(!tablasChange) : setTablasChange(true)}>
                    <option value={true}>Ventas</option>
                    <option value={false}>Vendedores</option>
                </select>
            </div>
            <div className="row justify-content-between px-3 my-3">
                <button data-toggle="modal" data-target="#admin-sale" className="btn btn-secondary  mb-3 mt-2 mt-md-0 col-12 col-md-2">Nueva Venta</button>
                <ModalRegAdminSeller tablasChange={tablasChange} />
            </div>
            <div className="border border-dark tableWrap">
                <AdminSaleModal getDatos={getDatos} datos={sellerDatos} />
                <ModalEditSales datos={fila} onChangeHandler={onChangeHandler} tablasChange={tablasChange} getDatos={getDatos} />
                <table className="table table-hover table-bordered">
                    <thead className="text-center thead-dark">
                        <tr>
                            {
                                tablasChange ?
                                    <>
                                        <th className="py-0 position-sticky text-nowrap px-1">
                                            <div className="row justify-content-center mx-0 input-group-sm pb-2">
                                                <p className="mb-0" onClick={sortDia}>Día</p>
                                                <input className="form-control" onChange={parameterSalesHandler} onKeyUp={enterSearch} name="date" placeholder='Día...' />
                                            </div>
                                        </th>
                                        <th className="py-0 position-sticky text-nowrap px-1" colSpan="3">
                                            <div className="row justify-content-center mx-0 input-group-sm pb-2">
                                                <p className="mb-0" onClick={sortNombre}>Nombre Cliente</p>
                                                <input className="form-control" onChange={parameterSalesHandler} onKeyUp={enterSearch} name="nameClient" placeholder='Nombre...' />
                                            </div>
                                        </th>
                                        <th className="py-0 position-sticky text-nowrap px-1">
                                            <div className="row justify-content-center mx-0 input-group-sm pb-2">
                                                <p className="mb-0" onClick={sortDNI}>DNI</p>
                                                <input className="form-control" onChange={parameterSalesHandler} onKeyUp={enterSearch} name="dniClient" placeholder='DNI...' />
                                            </div>
                                        </th>
                                        <th className="py-0 position-sticky text-nowrap px-1">
                                            <div className="row justify-content-center mx-0 input-group-sm pb-2">
                                                <p className="mb-0">Teléfono</p>
                                                <input className="form-control" onChange={parameterSalesHandler} onKeyUp={enterSearch} name="celphoneClient" placeholder='Teléfono...' />
                                            </div>
                                        </th>
                                        <th className="py-0 position-sticky text-nowrap px-1" colSpan="3">
                                            <div className="row justify-content-center mx-0 input-group-sm pb-2">
                                                <p className="mb-0" onClick={sortNombreSeller}>Vendedor</p>
                                                <input className="form-control" onChange={parameterSalesHandler} onKeyUp={enterSearch} name="fullname" placeholder='Vendedor...' />
                                            </div>
                                        </th>
                                        <th className="py-0 position-sticky text-nowrap px-1">
                                            <div className="row justify-content-center mx-0 input-group-sm pb-2">
                                                <p className="mb-0" onClick={sortNombre}>Tipo Venta</p>
                                                <input className="form-control" onChange={parameterSalesHandler} onKeyUp={enterSearch} name="creditLine" placeholder='Tipo Venta...' />
                                            </div>
                                        </th>
                                        <th className="py-0 position-sticky text-nowrap px-1">
                                            <div className="row justify-content-center mx-0 input-group-sm pb-2">
                                                <p className="mb-0" onClick={sortAmount}>Venta</p>
                                                <input className="form-control" onChange={parameterSalesHandler} name="amountApproved" onKeyUp={enterSearch} placeholder='Venta...' />
                                            </div>
                                        </th>
                                        <th className="py-0 position-sticky px-1" onClick={sortMonto}>
                                            <p className="text-center mb-2" >Monto Cuotas</p>

                                        </th>
                                        <th className="py-0 px-0 position-sticky"><p className="text-center">Cuotas</p></th>
                                        <th className="py-0 position-sticky">
                                            <select className="custom-select-sm mb-3 rounded" name="enable" onChange={parameterSalesHandler} as="select">
                                                <option selected value="SI">Habilitado</option>
                                                <option value="NO">Deshabilitado</option>
                                            </select>
                                        </th>
                                        <th className="py-0 position-sticky text-nowrap px-1"><p className="text-center">Observación</p></th>
                                        <th className="py-0 position-sticky text-nowrap px-1"><p className="text-center">Acción</p></th>
                                    </>
                                    :
                                    <>
                                        <th className="py-0 position-sticky text-nowrap px-1">
                                            <div className="row justify-content-center mx-0 input-group-sm pb-2">
                                                <p className="mb-0" onClick={sortNombreS}>Vendedor</p>
                                                <input className="form-control" onChange={parameterSellerHandler} onKeyUp={enterSearch} name="fullname" placeholder='Nombre...' />
                                            </div>
                                        </th>
                                        <th className="py-0 position-sticky text-nowrap px-1" colSpan="3">
                                            <div className="row justify-content-center mx-0 input-group-sm pb-2">
                                                <p className="mb-0" onClick={sortDNISe}>DNI</p>
                                                <input className="form-control" onChange={parameterSellerHandler} onKeyUp={enterSearch} name="dni" placeholder='DNI...' />
                                            </div>
                                        </th>
                                        <th className="py-0 position-sticky text-nowrap px-1">
                                            <div className="row justify-content-center mx-0 input-group-sm pb-2">
                                                <p className="mb-0" onClick={sortEmails}>Email</p>
                                                <input className="form-control" onChange={parameterSellerHandler} onKeyUp={enterSearch} name="email" placeholder='Email...' />
                                            </div>
                                        </th>
                                        <th className="py-0 position-sticky text-nowrap text-center">
                                            <div className="row justify-content-center mx-0 input-group-sm pb-2">
                                                <p className="mb-0">N° Celular</p>
                                                <input className="form-control" onChange={parameterSellerHandler} onKeyUp={enterSearch} name="celphone" placeholder='N° Celular...' />
                                            </div>
                                        </th>
                                        <th className="py-0 position-sticky text-nowrap text-center">
                                            <div className="row justify-content-center mx-0 input-group-sm pb-2">
                                                <p className="mb-0">Domicilio</p>
                                                <input className="form-control" onChange={parameterSellerHandler} onKeyUp={enterSearch} name="address" placeholder='Domicilio...' />
                                            </div>
                                        </th>
                                        <th className="py-0 position-sticky">
                                            <select className="custom-select-sm mb-3 rounded" name="enable" onChange={parameterSellerHandler} as="select">
                                                <option selected value="SI">Habilitado</option>
                                                <option value="NO">Deshabilitado</option>
                                            </select>
                                        </th>
                                        <th className="position-sticky text-nowrap text-center px-1">Accion</th>
                                    </>

                            }

                        </tr>

                    </thead>
                    <tbody>
                        <Suspense fallback={
                            <div className="spinner-border text-primary text-center" role="status">
                                <span className="sr-only text-center">Cargando...</span>
                            </div>
                        }>
                            <RowsTable tablasChange={tablasChange} datosShow={datosShow} datosSellerShow={datosSellerShow} onClickHandler={onClickHandler} deleteSaleHandler={deleteSaleHandler} getDatos={getDatos} />
                        </Suspense>
                    </tbody>
                </table>
            </div>
            <Pagination datosRowsSales={datosRowsSales} datosRowsSellers={datosRowsSellers} datosShow={datosShow} montosTotalesShow={montosTotalesShow} tablasChange={tablasChange} handlePaginate={handlePaginate} handlePaginateNext={handlePaginateNext} handlePaginatePrev={handlePaginatePrev} page={page} handleChangeRows={handleChangeRows} />
            <div className="mt-4">
                <p className="mb-0">Total Ventas {mes}: {sumSales.reduce((a, b) => a + b, 0)}</p>
                <p className="mb-0">Monto ventas {mes}: <strong>{new Intl.NumberFormat('es-AR', { currency: 'ARS', style: 'currency' }).format(month.reduce((a, b) => a + b, 0))}</strong></p>
                <p className="mb-0">Promedio ventas {mes}: <strong>{new Intl.NumberFormat('es-AR', { currency: 'ARS', style: 'currency' }).format(month.reduce((a, b) => a + b, 0)/45)}</strong></p>
                <p className="mb-0">Suma Total Anual: <strong>{new Intl.NumberFormat('es-AR', { currency: 'ARS', style: 'currency' }).format(annual.reduce((a, b) => a + b, 0))}</strong></p>
            </div>
        </div>
    );
}
