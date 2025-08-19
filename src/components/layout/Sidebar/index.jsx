// src/components/layout/Sidebar/index.jsx

import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Sidebar.module.css';
import { useAuth } from '../../../contexts/AuthContext';
import { BiHomeAlt, BiGroup, BiFile, BiCalendar, BiCog } from 'react-icons/bi';
import logoImage from '../../../assets/logo2.png';

// --- Sub-componentes ---
const NavItem = ({ to, icon, label }) => (
  <NavLink to={to} className={({ isActive }) => (isActive ? styles.active : '')}>
    {icon} <span>{label}</span>
  </NavLink>
);
NavItem.propTypes = { to: PropTypes.string.isRequired, icon: PropTypes.element.isRequired, label: PropTypes.string.isRequired };

const DisabledNavItem = ({ icon, label }) => (
  <span className={styles.disabledLink}>
    {icon} <span>{label}</span>
  </span>
);
DisabledNavItem.propTypes = { icon: PropTypes.element.isRequired, label: PropTypes.string.isRequired };

// --- Componente Principal da Sidebar ---
function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={logoImage} alt="Billity Logo" />
        <span>Billity</span>
      </div>
      
      <nav className={styles.nav}>
        {/* GRUPO DE LINKS PRINCIPAIS */}
        <ul className={styles.mainNav}>
          <li>
            <NavItem to="/dashboard" icon={<BiHomeAlt />} label="Início" />
          </li>
          <li>
            {user.profileComplete ? 
              <NavItem to="/clientes" icon={<BiGroup />} label="Clientes" /> : 
              <DisabledNavItem icon={<BiGroup />} label="Clientes" />}
          </li>
          <li>
            {user.profileComplete ? 
              // ROTA CORRIGIDA PARA /contracts
              <NavItem to="/contracts" icon={<BiFile />} label="Contratos" /> : 
              <DisabledNavItem icon={<BiFile />} label="Contratos" />}
          </li>
          <li>
            {user.profileComplete ? 
              <NavItem to="/vencimentos" icon={<BiCalendar />} label="Vencimentos" /> : 
              <DisabledNavItem icon={<BiCalendar />} label="Vencimentos" />}
          </li>
        </ul>

        {/* GRUPO DE LINKS DO RODAPÉ */}
        <ul className={styles.bottomNav}>
          <li>
            <NavItem to="/configuracoes" icon={<BiCog />} label="Configurações" />
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;