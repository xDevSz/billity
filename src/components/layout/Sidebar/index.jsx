// src/components/layout/Sidebar/index.jsx

import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types'; // PRECISAMOS IMPORTAR
import styles from './Sidebar.module.css';
import { useAuth } from '../../../contexts/AuthContext';
import { BiHomeAlt, BiGroup, BiFile, BiCalendar, BiCog } from 'react-icons/bi';

// --- Sub-componente para o link ATIVO ---
const NavItem = ({ to, icon, label }) => (
  <NavLink to={to} className={({ isActive }) => (isActive ? styles.active : '')}>
    {icon} <span>{label}</span>
  </NavLink>
);

// Validação de Props para NavItem
NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
};

// --- Sub-componente para o link DESABILITADO ---
const DisabledNavItem = ({ icon, label }) => (
  <span className={styles.disabledLink}>
    {icon} <span>{label}</span>
  </span>
);

// Validação de Props para DisabledNavItem
DisabledNavItem.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
};

// --- Componente Principal da Sidebar ---
function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>Billity</div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavItem to="/dashboard" icon={<BiHomeAlt />} label="Início" />
          </li>
          <li>
            {user.profileComplete ? (
              <NavItem to="/clientes" icon={<BiGroup />} label="Clientes" />
            ) : (
              <DisabledNavItem icon={<BiGroup />} label="Clientes" />
            )}
          </li>
          <li>
            {user.profileComplete ? (
              <NavItem to="/contratos" icon={<BiFile />} label="Contratos" />
            ) : (
              <DisabledNavItem icon={<BiFile />} label="Contratos" />
            )}
          </li>
          <li>
            {user.profileComplete ? (
              <NavItem to="/vencimentos" icon={<BiCalendar />} label="Vencimentos" />
            ) : (
              <DisabledNavItem icon={<BiCalendar />} label="Vencimentos" />
            )}
          </li>
          <li>
            {/* CORRIGIDO: Agora usamos NavItem e o ícone BiCog é utilizado */}
            <NavItem to="/configuracoes" icon={<BiCog />} label="Configurações" />
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;