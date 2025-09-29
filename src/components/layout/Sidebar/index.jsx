import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Sidebar.module.css';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  BiHomeAlt, 
  BiGroup, 
  BiFile, 
  BiCalendar, 
  BiCog,
  BiWallet,      
  BiUserX,       
  BiBarChartAlt2 
} from 'react-icons/bi';
import logoImage from '../../../assets/logo10.png';

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
      </div>
      
      <nav className={styles.nav}>
        {/* GRUPO DE LINKS PRINCIPAIS */}
        <ul className={styles.mainNav}>
          <li>
            <NavItem to="/dashboard" icon={<BiHomeAlt />} label="Dashboard" />
          </li>
          <li>
            {user.profileComplete ? 
              <NavItem to="/clientes" icon={<BiGroup />} label="Clientes" /> : 
              <DisabledNavItem icon={<BiGroup />} label="Clientes" />}
          </li>
          <li>
            {user.profileComplete ? 
              <NavItem to="/contracts" icon={<BiFile />} label="Contratos" /> : 
              <DisabledNavItem icon={<BiFile />} label="Contratos" />}
          </li>
          <li>
            {user.profileComplete ? 
              <NavItem to="/vencimentos" icon={<BiCalendar />} label="Vencimentos" /> : 
              <DisabledNavItem icon={<BiCalendar />} label="Vencimentos" />}
          </li>
          <li>
            {user.profileComplete ? 
              <NavItem to="/banca" icon={<BiWallet />} label="Gestão de Banca" /> : 
              <DisabledNavItem icon={<BiWallet />} label="Gestão de Banca" />}
          </li>
          <li>
            {user.profileComplete ? 
              <NavItem to="/inadimplencia" icon={<BiUserX />} label="Inadimplência" /> : 
              <DisabledNavItem icon={<BiUserX />} label="Inadimplência" />}
          </li>
          <li>
            {user.profileComplete ? 
              <NavItem to="/relatorios" icon={<BiBarChartAlt2 />} label="Relatórios" /> : 
              <DisabledNavItem icon={<BiBarChartAlt2 />} label="Relatórios" />}
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
