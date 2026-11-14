import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, ChevronDown, CheckCircle, Info, MoreHorizontal, X } from 'lucide-react';

const buttonVariants = {
  primary: 'preview-button--primary',
  secondary: 'preview-button--secondary',
  outline: 'preview-button--outline',
  ghost: 'preview-button--ghost',
  danger: 'preview-button--danger'
};

const statusCopy = {
  success: { icon: CheckCircle, label: 'Success', className: 'preview-alert--success' },
  info: { icon: Info, label: 'Heads up', className: 'preview-alert--info' },
  warning: { icon: Info, label: 'Attention', className: 'preview-alert--warning' },
  error: { icon: X, label: 'Something went wrong', className: 'preview-alert--error' }
};

function ButtonExample({ args, onAction }) {
  return (
    <button
      className={`preview-button ${buttonVariants[args.variant]} preview-button--${args.size}${args.fullWidth ? ' is-full-width' : ''}`}
      disabled={args.disabled}
      onClick={() => onAction('Button clicked — action received.')}
    >
      {args.label || 'Button'}
      <ArrowUpRight size={16} aria-hidden="true" />
    </button>
  );
}

function InputExample({ args }) {
  const [value, setValue] = useState('');
  const stateText = args.state === 'error'
    ? 'Please enter a valid email address.'
    : args.state === 'success'
      ? 'This email is available.'
      : 'We’ll only use this for account updates.';
  return (
    <label className="preview-field">
      <span className="preview-field__label">{args.label || 'Label'}</span>
      <span className={`preview-input-wrap is-${args.state}`}>
        <input
          aria-invalid={args.state === 'error'}
          disabled={args.disabled}
          placeholder={args.placeholder}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        {args.state === 'success' && <Check size={17} aria-hidden="true" />}
      </span>
      <span className={`preview-field__hint is-${args.state}`}>{stateText}</span>
    </label>
  );
}

function CardExample({ args, onAction }) {
  return (
    <article className={`preview-card preview-card--${args.variant}`}>
      <div className="preview-card__cover">
        <div className="preview-card__orbit preview-card__orbit--one" />
        <div className="preview-card__orbit preview-card__orbit--two" />
        <span className="preview-card__cover-label">NORTHSTAR / FIELD NOTES</span>
        <span className="preview-card__cover-mark">N.</span>
      </div>
      <div className="preview-card__body">
        <div className="preview-card__meta">PRODUCT DESIGN <span>·</span> 6 MIN READ</div>
        <h2>{args.title || 'Untitled card'}</h2>
        <p>{args.description}</p>
        {args.showAction && (
          <button className="preview-card__link" onClick={() => onAction('Card action selected.')}>
            Explore article <ArrowUpRight size={15} />
          </button>
        )}
      </div>
    </article>
  );
}

function ModalExample({ args, onAction }) {
  const [open, setOpen] = useState(true);
  return (
    <>
      {!open && (
        <button className="preview-button preview-button--primary preview-button--medium" onClick={() => setOpen(true)}>
          Open dialog
        </button>
      )}
      {open && (
        <div className="preview-modal-backdrop">
          <section className={`preview-modal preview-modal--${args.variant}`} role="dialog" aria-modal="true" aria-labelledby="preview-modal-title">
            <button className="preview-modal__close" aria-label="Close dialog" onClick={() => setOpen(false)}><X size={18} /></button>
            <div className="preview-modal__icon"><ArrowUpRight size={20} /></div>
            <h2 id="preview-modal-title">{args.title}</h2>
            <p>{args.description}</p>
            <div className="preview-modal__actions">
              <button className="preview-button preview-button--outline preview-button--small" onClick={() => setOpen(false)}>Cancel</button>
              <button className="preview-button preview-button--primary preview-button--small" onClick={() => { onAction('Changes published.'); setOpen(false); }}>
                {args.confirmLabel}
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

function AlertExample({ args }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => setVisible(true), [args.message, args.variant]);
  const status = statusCopy[args.variant];
  const StatusIcon = status.icon;
  if (!visible) return <button className="preview-button preview-button--outline preview-button--small" onClick={() => setVisible(true)}>Show alert</button>;
  return (
    <div className={`preview-alert ${status.className}`} role={args.variant === 'error' ? 'alert' : 'status'}>
      <StatusIcon size={19} aria-hidden="true" />
      <div><strong>{status.label}</strong><p>{args.message}</p></div>
      {args.dismissible && <button aria-label="Dismiss alert" onClick={() => setVisible(false)}><X size={17} /></button>}
    </div>
  );
}

function NavigationExample({ args }) {
  const [active, setActive] = useState('Overview');
  const links = ['Overview', 'Projects', 'Resources'];
  return (
    <nav className={`preview-nav preview-nav--${args.variant}`} aria-label="Example navigation">
      <a className="preview-nav__brand" href="#preview" onClick={(event) => event.preventDefault()}>
        <span>N</span>{args.brand || 'Brand'}
      </a>
      <div className="preview-nav__links">
        {links.map((link) => (
          <button key={link} className={active === link ? 'is-active' : ''} onClick={() => setActive(link)}>{link}</button>
        ))}
      </div>
      {args.showAction && <button className="preview-nav__action">Get started <ArrowUpRight size={14} /></button>}
      <button className="preview-nav__more" aria-label="More navigation options"><MoreHorizontal size={19} /></button>
    </nav>
  );
}

function BadgeExample({ args }) {
  return (
    <span className={`preview-badge preview-badge--${args.variant}`}>
      {args.dot && <span className="preview-badge__dot" />}
      {args.label || 'Badge'}
      <ChevronDown size={13} />
    </span>
  );
}

function AvatarExample({ args }) {
  const initials = (args.name || 'A C').split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className="preview-avatar-demo">
      <span className={`preview-avatar preview-avatar--${args.size}`} aria-label={args.name}>{initials}</span>
      <span className={`preview-avatar__presence is-${args.status}`} />
      <div><strong>{args.name || 'Your name'}</strong><span>Product designer</span></div>
    </div>
  );
}

function SwitchExample({ args, updateArg }) {
  return (
    <label className={`preview-switch${args.disabled ? ' is-disabled' : ''}`}>
      <span><strong>{args.label}</strong><small>Get product updates and activity alerts.</small></span>
      <button
        type="button"
        role="switch"
        aria-checked={args.checked}
        disabled={args.disabled}
        className={`preview-switch__track${args.checked ? ' is-checked' : ''}`}
        onClick={() => updateArg('checked', !args.checked)}
      >
        <span />
      </button>
    </label>
  );
}

const examples = {
  button: ButtonExample,
  input: InputExample,
  card: CardExample,
  modal: ModalExample,
  alert: AlertExample,
  navbar: NavigationExample,
  badge: BadgeExample,
  avatar: AvatarExample,
  switch: SwitchExample
};

export default function ComponentPreview({ story, args, updateArg, onAction }) {
  const Example = examples[story.id];
  return <Example args={args} updateArg={updateArg} onAction={onAction} />;
}
