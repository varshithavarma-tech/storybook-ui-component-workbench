export const COMPONENT_CATEGORIES = [
  { id: 'all', label: 'All components' },
  { id: 'actions', label: 'Actions' },
  { id: 'forms', label: 'Forms' },
  { id: 'data-display', label: 'Data display' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'overlays', label: 'Overlays' }
];

export const COMPONENT_STORIES = [
  {
    id: 'button',
    name: 'Button',
    category: 'actions',
    subtitle: 'Primary action',
    description: 'Buttons communicate actions a user can take. Use a clear label and reserve the primary style for the most important action.',
    controls: [
      { name: 'label', label: 'Label', type: 'text', defaultValue: 'Get started' },
      { name: 'variant', label: 'Variant', type: 'select', options: ['primary', 'secondary', 'outline', 'ghost', 'danger'], defaultValue: 'primary' },
      { name: 'size', label: 'Size', type: 'select', options: ['small', 'medium', 'large'], defaultValue: 'medium' },
      { name: 'disabled', label: 'Disabled', type: 'boolean', defaultValue: false },
      { name: 'fullWidth', label: 'Full width', type: 'boolean', defaultValue: false }
    ],
    props: [
      ['label', 'string', 'Button text'],
      ['variant', 'primary | secondary | outline | ghost | danger', 'Visual treatment'],
      ['size', 'small | medium | large', 'Button height and padding'],
      ['disabled', 'boolean', 'Prevents interaction'],
      ['fullWidth', 'boolean', 'Stretches to the container width']
    ],
    source: `function Button({ label = 'Get started', variant = 'primary', size = 'medium', disabled = false }) {
  return (
    <button className={\`button button--\${variant} button--\${size}\`} disabled={disabled}>
      {label}
    </button>
  );
}`
  },
  {
    id: 'input',
    name: 'Input',
    category: 'forms',
    subtitle: 'Text field',
    description: 'Inputs collect short-form user data. Pair every field with a visible label and use helper or error text to explain what is needed.',
    controls: [
      { name: 'label', label: 'Label', type: 'text', defaultValue: 'Email address' },
      { name: 'placeholder', label: 'Placeholder', type: 'text', defaultValue: 'you@example.com' },
      { name: 'state', label: 'State', type: 'select', options: ['default', 'focused', 'error', 'success'], defaultValue: 'default' },
      { name: 'disabled', label: 'Disabled', type: 'boolean', defaultValue: false }
    ],
    props: [
      ['label', 'string', 'Visible field label'],
      ['placeholder', 'string', 'Short input hint'],
      ['state', 'default | focused | error | success', 'Validation and focus appearance'],
      ['disabled', 'boolean', 'Prevents editing']
    ],
    source: `function TextField({ label, placeholder, error }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input placeholder={placeholder} aria-invalid={Boolean(error)} />
      {error && <small>{error}</small>}
    </label>
  );
}`
  },
  {
    id: 'card',
    name: 'Card',
    category: 'data-display',
    subtitle: 'Content container',
    description: 'Cards group related information and actions into a concise, scannable surface. Keep their hierarchy consistent across a collection.',
    controls: [
      { name: 'title', label: 'Title', type: 'text', defaultValue: 'Design systems, made simple' },
      { name: 'description', label: 'Description', type: 'text', defaultValue: 'A shared language for building thoughtful digital experiences.' },
      { name: 'variant', label: 'Style', type: 'select', options: ['default', 'outlined', 'elevated'], defaultValue: 'elevated' },
      { name: 'showAction', label: 'Show action', type: 'boolean', defaultValue: true }
    ],
    props: [
      ['title', 'string', 'Card heading'],
      ['description', 'string', 'Supporting copy'],
      ['variant', 'default | outlined | elevated', 'Surface treatment'],
      ['showAction', 'boolean', 'Displays the card action']
    ],
    source: `function Card({ title, description, children }) {
  return (
    <article className="card">
      <div className="card__eyebrow">FIELD NOTES · 04</div>
      <h2>{title}</h2>
      <p>{description}</p>
      {children}
    </article>
  );
}`
  },
  {
    id: 'modal',
    name: 'Modal',
    category: 'overlays',
    subtitle: 'Dialog window',
    description: 'Modals focus attention on a short task. Provide a clear title, a safe exit path, and an action that states the consequence.',
    controls: [
      { name: 'title', label: 'Title', type: 'text', defaultValue: 'Publish your changes?' },
      { name: 'description', label: 'Description', type: 'text', defaultValue: 'Your latest updates will be visible to everyone on the team.' },
      { name: 'confirmLabel', label: 'Confirm label', type: 'text', defaultValue: 'Publish now' },
      { name: 'variant', label: 'Accent', type: 'select', options: ['violet', 'blue', 'green'], defaultValue: 'violet' }
    ],
    props: [
      ['title', 'string', 'Dialog heading'],
      ['description', 'string', 'Context for the decision'],
      ['confirmLabel', 'string', 'Primary action label'],
      ['variant', 'violet | blue | green', 'Dialog accent color']
    ],
    source: `function ConfirmDialog({ title, description, onClose, onConfirm }) {
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="dialog-title">
      <h2 id="dialog-title">{title}</h2>
      <p>{description}</p>
      <button onClick={onClose}>Cancel</button>
      <button onClick={onConfirm}>Confirm</button>
    </div>
  );
}`
  },
  {
    id: 'alert',
    name: 'Alert',
    category: 'feedback',
    subtitle: 'Inline feedback',
    description: 'Alerts keep important status messages close to their context. Match the tone and icon to the meaning, not just the color.',
    controls: [
      { name: 'message', label: 'Message', type: 'text', defaultValue: 'Your changes have been saved.' },
      { name: 'variant', label: 'Status', type: 'select', options: ['success', 'info', 'warning', 'error'], defaultValue: 'success' },
      { name: 'dismissible', label: 'Dismissible', type: 'boolean', defaultValue: true }
    ],
    props: [
      ['message', 'string', 'Status message'],
      ['variant', 'success | info | warning | error', 'Semantic status'],
      ['dismissible', 'boolean', 'Shows a dismiss control']
    ],
    source: `function Alert({ variant = 'info', children, onDismiss }) {
  return (
    <div className={\`alert alert--\${variant}\`} role="status">
      <span>{children}</span>
      <button aria-label="Dismiss" onClick={onDismiss}>×</button>
    </div>
  );
}`
  },
  {
    id: 'navbar',
    name: 'Navigation bar',
    category: 'navigation',
    subtitle: 'Application header',
    description: 'Navigation bars give products a consistent home and a clear way to move between primary sections.',
    controls: [
      { name: 'brand', label: 'Brand', type: 'text', defaultValue: 'Northstar' },
      { name: 'variant', label: 'Style', type: 'select', options: ['light', 'dark', 'accent'], defaultValue: 'light' },
      { name: 'showAction', label: 'Show action', type: 'boolean', defaultValue: true }
    ],
    props: [
      ['brand', 'string', 'Product or workspace name'],
      ['variant', 'light | dark | accent', 'Navigation color theme'],
      ['showAction', 'boolean', 'Shows the primary action']
    ],
    source: `function NavigationBar({ brand, links }) {
  return (
    <nav aria-label="Main navigation">
      <a className="brand" href="/">{brand}</a>
      <ul>{links.map(link => <li key={link.href}>
        <a href={link.href}>{link.label}</a>
      </li>)}</ul>
    </nav>
  );
}`
  },
  {
    id: 'badge',
    name: 'Badge',
    category: 'data-display',
    subtitle: 'Compact label',
    description: 'Badges add a small amount of metadata to an item. Use short labels and distinguish status, category, and count.',
    controls: [
      { name: 'label', label: 'Label', type: 'text', defaultValue: 'In progress' },
      { name: 'variant', label: 'Color', type: 'select', options: ['violet', 'blue', 'green', 'amber', 'neutral'], defaultValue: 'violet' },
      { name: 'dot', label: 'Show status dot', type: 'boolean', defaultValue: true }
    ],
    props: [
      ['label', 'string', 'Badge text'],
      ['variant', 'violet | blue | green | amber | neutral', 'Badge color'],
      ['dot', 'boolean', 'Displays a leading status dot']
    ],
    source: `function Badge({ children, variant = 'neutral' }) {
  return <span className={\`badge badge--\${variant}\`}>{children}</span>;
}`
  },
  {
    id: 'avatar',
    name: 'Avatar',
    category: 'data-display',
    subtitle: 'User identity',
    description: 'Avatars identify people in compact spaces. Include an accessible name and use initials when a profile image is unavailable.',
    controls: [
      { name: 'name', label: 'Name', type: 'text', defaultValue: 'Avery Chen' },
      { name: 'size', label: 'Size', type: 'select', options: ['small', 'medium', 'large'], defaultValue: 'large' },
      { name: 'status', label: 'Status', type: 'select', options: ['online', 'away', 'offline'], defaultValue: 'online' }
    ],
    props: [
      ['name', 'string', 'Accessible user name'],
      ['size', 'small | medium | large', 'Avatar diameter'],
      ['status', 'online | away | offline', 'Presence indicator']
    ],
    source: `function Avatar({ name, src }) {
  const initials = name.split(' ')
    .map(part => part[0]).join('');

  return src
    ? <img className="avatar" src={src} alt={name} />
    : <span className="avatar" aria-label={name}>{initials}</span>;
}`
  },
  {
    id: 'switch',
    name: 'Switch',
    category: 'forms',
    subtitle: 'Toggle setting',
    description: 'Switches immediately turn a setting on or off. Keep the label visible and make its current state understandable without color.',
    controls: [
      { name: 'label', label: 'Label', type: 'text', defaultValue: 'Enable notifications' },
      { name: 'checked', label: 'On', type: 'boolean', defaultValue: true },
      { name: 'disabled', label: 'Disabled', type: 'boolean', defaultValue: false }
    ],
    props: [
      ['label', 'string', 'Setting description'],
      ['checked', 'boolean', 'Current switch state'],
      ['disabled', 'boolean', 'Prevents interaction']
    ],
    source: `function Switch({ label, checked, onChange }) {
  return (
    <label className="switch">
      <span>{label}</span>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="switch__track" aria-hidden="true" />
    </label>
  );
}`
  }
];

export const getDefaultArgs = (story) =>
  Object.fromEntries(story.controls.map(({ name, defaultValue }) => [name, defaultValue]));
