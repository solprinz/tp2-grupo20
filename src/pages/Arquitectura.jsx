import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { architectureSteps, architectureTree, nodeTypes } from '../data/architectureData';
import styles from './Arquitectura.module.css';

function ArchitectureNode({ node, collapsed, onToggle, path = 'root' }) {
  const hasChildren = node.children.length > 0;
  const isOpen = !collapsed.has(path);
  const content = <>
    <span className={styles.badge} data-type={node.type}>{nodeTypes[node.type]}</span>
    <span className={styles.nodeText}>
      <strong>{node.name}</strong>
      {node.route && <code className={styles.route}>{node.route}</code>}
      <span className={styles.description}>{node.description}</span>
    </span>
    {hasChildren && <span className={styles.toggle} aria-hidden="true">{isOpen ? '−' : '+'}</span>}
  </>;

  return <li className={styles.node}>
    {hasChildren ? <button type="button" className={styles.nodeCard}
      aria-expanded={isOpen} aria-controls={`branch-${path}`}
      onClick={() => onToggle(path)}>{content}</button>
      : <div className={styles.nodeCard}>{content}</div>}
    {hasChildren && <ul id={`branch-${path}`} className={styles.branch} hidden={!isOpen}>
      {node.children.map((child, index) => <ArchitectureNode key={child.name}
        node={child} path={`${path}-${index}`} collapsed={collapsed} onToggle={onToggle} />)}
    </ul>}
  </li>;
}

ArchitectureNode.propTypes = {
  node: PropTypes.shape({ name: PropTypes.string.isRequired, type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired, children: PropTypes.array.isRequired, route: PropTypes.string }).isRequired,
  collapsed: PropTypes.instanceOf(Set).isRequired, onToggle: PropTypes.func.isRequired, path: PropTypes.string,
};

export function Arquitectura() {
  const [collapsed, setCollapsed] = useState(new Set());
  useEffect(() => {
    const previous = document.title;
    document.title = 'Hallows Code: Arquitectura';
    window.scrollTo(0, 0);
    return () => { document.title = previous; };
  }, []);

  function toggle(path) {
    setCollapsed(current => {
      const next = new Set(current);
      if (next.has(path)) next.delete(path); else next.add(path);
      return next;
    });
  }

  return <article className={styles.page} aria-labelledby="architecture-title">
    <header className={styles.hero}>
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>Hallows Code · Archivo del proyecto</p>
        <h1 id="architecture-title">Mapa de la arquitectura</h1>
        <p className={styles.intro}>Revelio. Descubrí los pasadizos del código: desde la raíz de React hasta cada componente que da vida a nuestro Hogwarts.</p>
        <a href="#component-tree" className={styles.mapLink}>Explorar el árbol <span aria-hidden="true">↓</span></a>
      </div>
      <div className={styles.seal} aria-hidden="true"><img src="/img/hallows-logo.png" alt="" /><span>La magia tiene estructura</span></div>
    </header>

    <section className={styles.overview} aria-labelledby="render-title">
      <p className={styles.eyebrow}>Los cinco encantamientos del renderizado</p>
      <h2 id="render-title">Cómo cobra vida el castillo</h2>
      <div className={styles.steps}>
        {architectureSteps.map(([number, title, name, description]) => <div className={styles.step} key={number}>
          <span className={styles.stepNumber}>{number}</span><p className={styles.stepLabel}>{title}</p>
          <h3>{name}</h3><p>{description}</p>
        </div>)}
      </div>
    </section>

    <section id="component-tree" className={styles.map} aria-labelledby="tree-title">
      <header className={styles.mapHeader}>
        <div><p className={styles.eyebrow}>El mapa del código</p><h2 id="tree-title">De la raíz a cada hechizo</h2></div>
        <p>La rama de <strong>Routes</strong> cambia con la URL. La navegación, el pie y la varita permanecen compartidos.</p>
      </header>
      <ul className={styles.legend} aria-label="Tipos de nodos">
        {Object.entries(nodeTypes).map(([type, label]) => <li key={type}><span className={styles.badge} data-type={type}>{label}</span></li>)}
      </ul>
      <div className={styles.toolbar}>
        <p>Seleccioná una rama para ocultar o revelar sus descendientes.</p>
        <div className={styles.actions}>
          <button type="button" onClick={() => setCollapsed(new Set())}>Revelar todo</button>
          <button type="button" onClick={() => setCollapsed(new Set(['root']))}>Plegar árbol</button>
        </div>
      </div>
      <ul className={styles.tree}><ArchitectureNode node={architectureTree} collapsed={collapsed} onToggle={toggle} /></ul>
      <p className={styles.mapNote}>✦ Las líneas indican composición visual. Los nodos HTML y los slots se distinguen de los componentes; las ramas condicionales no aparecen todas a la vez.</p>
    </section>
    <footer className={styles.endnote}>Travesura realizada. Arquitectura revelada.</footer>
  </article>;
}
