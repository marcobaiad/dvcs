import React from 'react';
import { useHistory } from 'react-router-dom';
import '../css/Header.css';
import auth from '../utils/auth';
import clienteAxios from '../config/axios';

export default function Administracion() {

    const isLogedIn = false;
    const history = useHistory();

    const pathHome = history.location.pathname;

    const LogUotHandler = async () => {
        try {
            await clienteAxios.get(`/api/v1/logout`);
            auth.logOut();
            window.location = '/';
        } catch (e) {
            const { response } = e;
            if (response.data.error && response.data.error.includes('expired')) {
                console.log('La sesión finalizó');
            }
        }
    }

    return (
        <>
            { pathHome !== '/' ?
                <nav className="navbar">
                    <img className="img-fluid" src={require('../assets/marca-blanca.png')} width="100px" />
                    <div>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item mx-2">
                                {isLogedIn ?
                                    <button className="btn btn-light px-2">Mi Cuenta</button>
                                    :
                                    <button className="btn btn-light px-2" onClick={LogUotHandler}>Cerrar Sesión</button>
                                }
                            </li>
                        </ul>
                    </div>
                </nav>
                :
                ''
            }
        </>
    );
}

