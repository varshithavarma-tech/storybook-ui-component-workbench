import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlignLeft, AppWindow, ArrowDown, ArrowLeft, ArrowRight, BookOpenText, Check,
  ChevronDown, ChevronRight, HelpCircle, Code2, Command, Copy, ExternalLink,
  FileText, FormInput, Grid2X2, Info, Layers3, Menu, Monitor, Moon, MousePointer2,
  PanelRight, Search, Settings2, Smartphone, Sun, Tablet, X
} from 'lucide-react';
import ComponentPreview from './components/ComponentPreview.jsx';
import { COMPONENT_CATEGORIES, COMPONENT_STORIES, getDefaultArgs } from './data/componentStories.js';
import './workbench.css';

const categoryIcons = {
  actions: MousePointer2,
  forms: FormInput,
  'data-display': Grid2X2,
  feedback: HelpCircle,
  navigation: AlignLeft,
  overlays: AppWindow
};

const viewports = [
  { id: 'desktop', label: 'Desktop', icon: Monitor },
  { id: 'tablet', label: 'Tablet', icon: Tablet },
  { id: 'mobile', label: 'Mobile', icon: Smartphone }
];

const initialArgs = Object.fromEntries(COMPONENT_STORIES.map((story) => [story.id, getDefaultArgs(story)]));
const syntaxTokenPattern = /(\/\*[\s\S]*?\*\/|\/\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|<\/?[A-Za-z][\w.-]*|\/?>|\b(?:async|await|const|default|export|function|return|class|new|if|else|true|false|null|undefined|import|from)\b|\b\d+\b)/g;
const syntaxKeywords = new Set(['async', 'await', 'const', 'default', 'export', 'function', 'return', 'class', 'new', 'if', 'else', 'true', 'false', 'null', 'undefined', 'import', 'from']);

function HighlightedCode({ source }) {
  return (
    <code className="syntax-code" aria-label="Syntax-highlighted JSX source">
      {source.split(syntaxTokenPattern).map((token, index) => {
        if (!token) return null;
        let tokenType = '';
        if (token.startsWith('//') || token.startsWith('/*')) tokenType = 'comment';
        else if (/^["'`]/.test(token)) tokenType = 'string';
        else if (/^<\/?[A-Za-z]/.test(token)) tokenType = 'tag';
        else if (syntaxKeywords.has(token)) tokenType = 'keyword';
        else if (/^\d+$/.test(token)) tokenType = 'number';
        else if (/^(?:\/?>)$/.test(token)) tokenType = 'punctuation';
        return tokenType
          ? <span className={`code-token code-token--${tokenType}`} key={index}>{token}</span>
          : token;
      })}
    </code>
  );
}

export default function Workbench() {
  const [selectedId, setSelectedId] = useState(COMPONENT_STORIES[0].id);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [argsByStory, setArgsByStory] = useState(initialArgs);
  const [viewport, setViewport] = useState('desktop');
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('preview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [copied, setCopied] = useState(false);
  const searchInputRef = useRef(null);

  const selectedStory = COMPONENT_STORIES.find((story) => story.id === selectedId) ?? COMPONENT_STORIES[0];
  const args = argsByStory[selectedStory.id];
  const visibleStories = useMemo(() => {
    const query = search.trim().toLowerCase();
    return COMPONENT_STORIES.filter((story) => {
      const inCategory = activeCategory === 'all' || story.category === activeCategory;
      const categoryLabel = COMPONENT_CATEGORIES.find((category) => category.id === story.category)?.label ?? '';
      const matchesSearch = !query || `${story.name} ${story.subtitle} ${story.description} ${categoryLabel}`.toLowerCase().includes(query);
      return inCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  useEffect(() => {
    const handleSearchShortcut = (event) => {
      const target = event.target;
      const isEditing = target instanceof HTMLElement
        && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));
      if (event.key === '/' && !isEditing && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
      if (event.key === 'Escape' && target === searchInputRef.current) {
        setSearch('');
        searchInputRef.current.blur();
      }
    };
    window.addEventListener('keydown', handleSearchShortcut);
    return () => window.removeEventListener('keydown', handleSearchShortcut);
  }, []);

  const updateArg = (name, value) => {
    setArgsByStory((current) => ({
      ...current,
      [selectedStory.id]: { ...current[selectedStory.id], [name]: value }
    }));
  };

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2400);
  };

  const selectStory = (story) => {
    setSelectedId(story.id);
    setActiveTab('preview');
    setSidebarOpen(false);
  };

  const copySource = async () => {
    try {
      await navigator.clipboard.writeText(selectedStory.source);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch (error) {
      showToast('Clipboard access is unavailable in this browser.');
    }
  };

  const handleTabKeyDown = (event) => {
    const tabs = ['preview', 'docs', 'code'];
    const currentIndex = tabs.indexOf(activeTab);
    let nextIndex = currentIndex;
    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = tabs.length - 1;
    else return;

    event.preventDefault();
    const nextTab = tabs[nextIndex];
    setActiveTab(nextTab);
    event.currentTarget.parentElement?.querySelector(`#tab-${nextTab}`)?.focus();
  };

  const currentCategory = COMPONENT_CATEGORIES.find((category) => category.id === selectedStory.category);
  const selectedIndex = COMPONENT_STORIES.findIndex((story) => story.id === selectedStory.id);

  return (
    <div className={`workbench theme-${theme}`}>
      <aside className={`sidebar${sidebarOpen ? ' sidebar--open' : ''}`}>
        <div className="sidebar__brand">
          <div className="brand-mark" aria-hidden="true"><BookOpenText size={19} strokeWidth={2.2} /></div>
          <span>storybook</span>
          <span className="brand-version">v8.2</span>
          <button className="sidebar__close" onClick={() => setSidebarOpen(false)} aria-label="Close component sidebar"><X size={18} /></button>
        </div>

        <button className="workspace-select">
          <span className="workspace-select__avatar">N</span>
          <span className="workspace-select__copy"><strong>Northstar design</strong><small>Workspace</small></span>
          <ChevronDown size={15} />
        </button>

        <div className="sidebar__search">
          <Search size={15} aria-hidden="true" />
          <input
            aria-label="Search components and stories"
            placeholder="Find components..."
            value={search}
            ref={searchInputRef}
            onChange={(event) => setSearch(event.target.value)}
          />
          {search ? <button aria-label="Clear search" onClick={() => setSearch('')}><X size={14} /></button> : <kbd>/</kbd>}
        </div>

        <nav className="component-nav" aria-label="Component explorer">
          <div className="nav-section-heading">
            <span>COMPONENTS</span><button aria-label="Component settings"><Settings2 size={14} /></button>
          </div>
          {COMPONENT_CATEGORIES.map((category) => {
            if (category.id === 'all') return null;
            const Icon = categoryIcons[category.id];
            const categoryStories = visibleStories.filter((story) => story.category === category.id);
            if (!categoryStories.length) return null;
            const expanded = activeCategory === 'all' || activeCategory === category.id;
            return (
              <div className="nav-group" key={category.id}>
                <button
                  className={`nav-group__heading${activeCategory === category.id ? ' is-selected' : ''}`}
                  onClick={() => setActiveCategory(activeCategory === category.id ? 'all' : category.id)}
                  aria-expanded={expanded}
                >
                  <Icon size={15} />
                  <span>{category.label}</span>
                  <span className="nav-group__count">{categoryStories.length}</span>
                  <ChevronDown size={13} className={expanded ? '' : 'is-collapsed'} />
                </button>
                {expanded && categoryStories.map((story) => (
                  <button
                    className={`story-link${selectedId === story.id ? ' is-active' : ''}`}
                    key={story.id}
                    onClick={() => selectStory(story)}
                    aria-current={selectedId === story.id ? 'page' : undefined}
                  >
                    <span className="story-link__glyph">◈</span>
                    <span>{story.name}</span>
                    {selectedId === story.id && <span className="story-link__dot" />}
                  </button>
                ))}
              </div>
            );
          })}
          {visibleStories.length === 0 && <p className="sidebar__empty">No components match “{search}”.</p>}
        </nav>

        <div className="sidebar__footer">
          <button><Layers3 size={15} /><span>Design tokens</span><span className="coming-soon">SOON</span></button>
          <button><HelpCircle size={15} /><span>Help & feedback</span><ExternalLink size={13} /></button>
          <div className="sidebar__user">
            <span className="sidebar__user-avatar">AC</span>
            <span><strong>Avery Chen</strong><small>Design system team</small></span>
            <MoreHorizontalIcon />
          </div>
        </div>
      </aside>

      {sidebarOpen && <button className="sidebar-backdrop" aria-label="Close menu" onClick={() => setSidebarOpen(false)} />}

      <section className="work-area">
        <header className="topbar">
          <div className="topbar__left">
            <button className="mobile-menu" aria-label="Open component sidebar" onClick={() => setSidebarOpen(true)}><Menu size={19} /></button>
            <div className="breadcrumbs">
              <span>Components</span><ChevronRight size={14} />
              <span>{currentCategory?.label}</span><ChevronRight size={14} />
              <strong>{selectedStory.name}</strong>
            </div>
            <span className="story-tag">STORY</span>
          </div>
          <div className="topbar__right">
            <button className="topbar-icon-button" aria-label="View shortcuts"><Command size={17} /></button>
            <button className="topbar-icon-button" aria-label="Documentation"><FileText size={17} /></button>
            <span className="topbar-divider" />
            <button
              className="theme-toggle"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              aria-pressed={theme === 'dark'}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
              <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
            </button>
          </div>
        </header>

        <main className="workspace">
          <div className="workspace__heading">
            <div>
              <div className="eyebrow">{selectedStory.subtitle}</div>
              <h1>{selectedStory.name}</h1>
              <p>{selectedStory.description}</p>
            </div>
            <button className="heading-more" aria-label="More component options"><MoreHorizontalIcon /></button>
          </div>

          <div className="workbench-grid">
            <section className="preview-column" aria-label="Component preview and documentation">
              <div className="canvas-toolbar">
                <div className="canvas-toolbar__tabs" role="tablist" aria-label="Component panels">
                  <button id="tab-preview" className={activeTab === 'preview' ? 'is-active' : ''} onClick={() => setActiveTab('preview')} onKeyDown={handleTabKeyDown} role="tab" aria-selected={activeTab === 'preview'} aria-controls="panel-preview" tabIndex={activeTab === 'preview' ? 0 : -1}>
                    <AppWindow size={15} /> Canvas
                  </button>
                  <button id="tab-docs" className={activeTab === 'docs' ? 'is-active' : ''} onClick={() => setActiveTab('docs')} onKeyDown={handleTabKeyDown} role="tab" aria-selected={activeTab === 'docs'} aria-controls="panel-docs" tabIndex={activeTab === 'docs' ? 0 : -1}>
                    <BookOpenText size={15} /> Docs
                  </button>
                  <button id="tab-code" className={activeTab === 'code' ? 'is-active' : ''} onClick={() => setActiveTab('code')} onKeyDown={handleTabKeyDown} role="tab" aria-selected={activeTab === 'code'} aria-controls="panel-code" tabIndex={activeTab === 'code' ? 0 : -1}>
                    <Code2 size={15} /> Source
                  </button>
                </div>
                <div className="viewport-switcher" role="group" aria-label="Preview viewport">
                  {viewports.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      className={viewport === id ? 'is-active' : ''}
                      aria-label={`${label} viewport`}
                      title={`${label} viewport`}
                      aria-pressed={viewport === id}
                      onClick={() => setViewport(id)}
                    >
                      <Icon size={16} />
                    </button>
                  ))}
                </div>
              </div>

              {activeTab === 'preview' && (
                <div className={`preview-canvas preview-canvas--${viewport}`} id="panel-preview" role="tabpanel" aria-labelledby="tab-preview" tabIndex={0}>
                  <div className="canvas-info"><span className="canvas-info__live" /> Preview <span>·</span> {viewport === 'desktop' ? '1440 px' : viewport === 'tablet' ? '768 px' : '375 px'}</div>
                  <div className="preview-viewport">
                    <div className="preview-viewport__surface">
                      <ComponentPreview story={selectedStory} args={args} updateArg={updateArg} onAction={showToast} />
                    </div>
                  </div>
                  <div className="canvas-footer"><span>Drag the corner to resize</span><span className="canvas-footer__dimensions">{viewport === 'desktop' ? '1440 × 900' : viewport === 'tablet' ? '768 × 1024' : '375 × 812'}</span></div>
                </div>
              )}

              {activeTab === 'docs' && (
                <section className="docs-panel" id="panel-docs" role="tabpanel" aria-labelledby="tab-docs" tabIndex={0}>
                  <div className="docs-panel__intro">
                    <div className="docs-panel__icon"><BookOpenText size={19} /></div>
                    <div><span className="eyebrow">COMPONENT REFERENCE</span><h2>{selectedStory.name}</h2></div>
                  </div>
                  <p>{selectedStory.description}</p>
                  <h3>Props</h3>
                  <div className="props-table-wrap">
                    <table className="props-table">
                      <thead><tr><th>Property</th><th>Type</th><th>Description</th></tr></thead>
                      <tbody>{selectedStory.props.map(([name, type, description]) => (
                        <tr key={name}><td><code>{name}</code></td><td><code>{type}</code></td><td>{description}</td></tr>
                      ))}</tbody>
                    </table>
                  </div>
                  <h3>Usage</h3>
                  <div className="docs-usage"><Code2 size={16} /><code>import {'{'} {selectedStory.name.replaceAll(' ', '')} {'}'} from '@northstar/ui';</code></div>
                </section>
              )}

              {activeTab === 'code' && (
                <section className="code-panel" id="panel-code" role="tabpanel" aria-labelledby="tab-code" tabIndex={0}>
                  <div className="code-panel__toolbar"><span><span className="code-dot" /> {selectedStory.name.replaceAll(' ', '')}.jsx</span><button onClick={copySource}>{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? 'Copied' : 'Copy'}</button></div>
                  <pre><HighlightedCode source={selectedStory.source} /></pre>
                  <div className="code-panel__note"><Info size={15} /> Example source for this story. Adjust the controls to explore the component API.</div>
                </section>
              )}

              <div className="preview-bottom-bar">
                <span><span className="bottom-status-dot" /> Canvas ready</span>
                <span>Story <strong>{String(selectedIndex + 1).padStart(2, '0')}</strong> of {String(COMPONENT_STORIES.length).padStart(2, '0')}</span>
                <div><button aria-label="Previous component" onClick={() => selectStory(COMPONENT_STORIES[(selectedIndex - 1 + COMPONENT_STORIES.length) % COMPONENT_STORIES.length])}><ArrowLeft size={15} /></button><button aria-label="Next component" onClick={() => selectStory(COMPONENT_STORIES[(selectedIndex + 1) % COMPONENT_STORIES.length])}><ArrowRight size={15} /></button></div>
              </div>
            </section>

            <aside className="controls-panel" aria-label="Interactive component controls">
              <div className="controls-panel__heading">
                <div><PanelRight size={16} /><h2>Controls</h2></div>
                <button aria-label="Reset component controls" title="Reset to defaults" onClick={() => setArgsByStory((current) => ({ ...current, [selectedStory.id]: getDefaultArgs(selectedStory) }))}><ArrowDown size={15} /></button>
              </div>
              <p className="controls-panel__description">Adjust the props and see your component update in real time.</p>
              <div className="control-list">
                {selectedStory.controls.map((control) => (
                  <div className="control-field" key={control.name}>
                    <label className="control-field__label" htmlFor={`control-${control.name}`}>{control.label}</label>
                    {control.type === 'text' && (
                      <input id={`control-${control.name}`} className="control-input" value={args[control.name]} onChange={(event) => updateArg(control.name, event.target.value)} />
                    )}
                    {control.type === 'select' && (
                      <div className="control-select-wrap"><select id={`control-${control.name}`} className="control-input control-select" value={args[control.name]} onChange={(event) => updateArg(control.name, event.target.value)}>{control.options.map((option) => <option key={option} value={option}>{option}</option>)}</select><ChevronDown size={14} /></div>
                    )}
                    {control.type === 'boolean' && (
                      <button
                        id={`control-${control.name}`}
                        className={`control-toggle${args[control.name] ? ' is-on' : ''}`}
                        role="switch"
                        aria-checked={args[control.name]}
                        aria-label={control.label}
                        onClick={() => updateArg(control.name, !args[control.name])}
                      ><span /></button>
                    )}
                  </div>
                ))}
              </div>
              <div className="controls-panel__tip"><Info size={15} /><span>Controls are local to this story and reset when you choose <strong>Reset controls</strong>.</span></div>
              <button className="show-code-button" onClick={() => setActiveTab('code')}><Code2 size={15} /> View JSX source <ArrowRight size={14} /></button>
            </aside>
          </div>
        </main>
        <footer className="work-area__footer"><span><span className="footer-online-dot" /> All changes saved</span><span>Storybook Studio <span>·</span> Local preview</span></footer>
      </section>

      {toast && <div className="action-toast" role="status">{toast}</div>}
    </div>
  );
}

function MoreHorizontalIcon() {
  return <span className="more-dots" aria-hidden="true">···</span>;
}
