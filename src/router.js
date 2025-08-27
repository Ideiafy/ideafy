import { Routes, Route } from "react-router-dom";

import Inicio from "./pages/inicio.js";
import Login from "./pages/login.js";
import Register from "./pages/register.js";
import Feed from "./pages/feed.js";
import Configuracoes from "./pages/configuracoes.js";
import Conta from "./pages/conta.js";
import Desenvolvimento from "./pages/desenvolvimento.js";
import Card from "./pages/componentes/card.js";

export default function AppRoutes() {

    return (
        <>
            {/* Define as rotas aqui */}
            <div className="main">
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastro" element={<Register />} />
                    <Route path="/feed" element={<Feed />} />
                    <Route path="/conta" element={<Conta />} />
                    <Route path="/notificacoes" element={<Desenvolvimento />} />
                    <Route path="/mensagens" element={<Desenvolvimento />} />
                    <Route path="/configuracoes" element={<Configuracoes />} />
                    <Route path="/teste" element={<Card />} />
                    
                </Routes>
            </div>
        </>
    );
}
