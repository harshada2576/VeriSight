const Icon = ({ name, size = 24, color = '#D8DDE3', style = {} }) => {
  const iconStyles = {
    width: `${size}px`,
    height: `${size}px`,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: color,
    ...style,
  };

  // Icon mapping - using Unicode symbols and emojis for simplicity
  const icons = {
    // Navigation
    home: '🏠',
    dashboard: '📊',
    upload: '📤',
    jobs: '📋',
    settings: '⚙️',
    logout: '🚪',
    
    // Actions
    check: '✓',
    close: '×',
    edit: '✎',
    delete: '🗑️',
    download: '⬇️',
    share: '🔗',
    copy: '📋',
    
    // Status
    success: '✓',
    error: '✗',
    warning: '⚠️',
    info: 'ℹ',
    loading: '⟳',
    
    // Content
    video: '🎬',
    image: '🖼️',
    audio: '🎵',
    file: '📄',
    folder: '📁',
    
    // User
    user: '👤',
    team: '👥',
    profile: '👤',
    
    // Security
    lock: '🔒',
    unlock: '🔓',
    key: '🔑',
    shield: '🛡️',
    
    // Other
    search: '🔍',
    filter: '⚗️',
    sort: '⇅',
    refresh: '🔄',
    more: '⋯',
    play: '▶',
    pause: '⏸',
    stop: '⏹',
  };

  return (
    <span style={iconStyles} role="img" aria-label={name}>
      {icons[name] || '•'}
    </span>
  );
};

export default Icon;
