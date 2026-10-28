/**
 * LiveWire — Interactive Wireframing Studio
 * Complete Client-side Engine with Moving, Resizing, Placing, Spawning & Deleting
 */

(function () {
  'use strict';

  // ==========================================================================
  // Component Definitions & HTML Templates
  // ==========================================================================

  const COMPONENTS = {
    'navbar': {
      id: 'navbar',
      name: 'Top Menu Bar',
      category: 'nav',
      icon: '🧭',
      desc: '[ Logo ] + Nav links',
      defaultData: {
        brand: '[ SimpleArch ]',
        links: ['Guide', 'Selector', 'GitHub']
      },
      render: function (data) {
        const d = data || this.defaultData;
        const linksHtml = d.links.map(link => 
          `<span class="wf-nav-link" contenteditable="true" spellcheck="false">${link}</span>`
        ).join('');
        return `
          <div class="wf-block" data-type="navbar">
            <header class="wf-navbar">
              <div class="wf-brand" contenteditable="true" spellcheck="false">${d.brand}</div>
              <nav class="wf-nav-links">
                ${linksHtml}
                <span class="wf-nav-add-link" title="Add nav link">+ Add link</span>
              </nav>
            </header>
          </div>
        `;
      }
    },

    'breadcrumbs': {
      id: 'breadcrumbs',
      name: 'Breadcrumbs',
      category: 'nav',
      icon: '🍞',
      desc: 'Guide > Section > Page',
      defaultData: {
        items: ['Guide', 'Bootloader']
      },
      render: function (data) {
        const d = data || this.defaultData;
        const itemsHtml = d.items.map((item, idx) => {
          const isLast = idx === d.items.length - 1;
          const cls = isLast ? 'wf-breadcrumb-item active' : 'wf-breadcrumb-item';
          const sep = isLast ? '' : '<span class="wf-breadcrumb-sep">&gt;</span>';
          return `<span class="${cls}" contenteditable="true" spellcheck="false">${item}</span>${sep}`;
        }).join('');
        return `
          <div class="wf-block" data-type="breadcrumbs">
            <div class="wf-content-container" style="padding-top: 16px; padding-bottom: 0;">
              <nav class="wf-breadcrumbs">
                ${itemsHtml}
              </nav>
            </div>
          </div>
        `;
      }
    },

    'stepper-dashes': {
      id: 'stepper-dashes',
      name: 'Step Dash Bar',
      category: 'nav',
      icon: '➖',
      desc: '8-step progress dashes (interactive!)',
      defaultData: {
        total: 8,
        active: 4
      },
      render: function (data) {
        const d = data || this.defaultData;
        let dashesHtml = '';
        for (let i = 0; i < d.total; i++) {
          const isActive = i < d.active;
          const cls = isActive ? 'wf-dash active' : 'wf-dash inactive';
          dashesHtml += `<div class="${cls}" data-index="${i}" title="Step ${i + 1} (Click to toggle)"></div>`;
        }
        return `
          <div class="wf-block" data-type="stepper-dashes">
            <div class="wf-content-container" style="padding-top: 4px; padding-bottom: 4px;">
              <div class="wf-stepper-dashes">
                ${dashesHtml}
                <div class="wf-stepper-controls">
                  <button class="wf-stepper-btn" data-step-action="remove" title="Remove a dash">- Dash</button>
                  <button class="wf-stepper-btn" data-step-action="add" title="Add a dash">+ Dash</button>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    },

    'page-header': {
      id: 'page-header',
      name: 'Page Title + Subtitle',
      category: 'text',
      icon: '🔤',
      desc: 'H1 Title with descriptive subtitle',
      defaultData: {
        title: 'Bootloader',
        subtitle: 'Choosing between GRUB and Limine, and configuring Plymouth + UKI options.'
      },
      render: function (data) {
        const d = data || this.defaultData;
        return `
          <div class="wf-block" data-type="page-header">
            <div class="wf-content-container" style="padding-top: 10px; padding-bottom: 10px;">
              <div class="wf-page-title-block">
                <h1 class="wf-page-title" contenteditable="true" spellcheck="false">${d.title}</h1>
                <p class="wf-page-subtitle" contenteditable="true" spellcheck="false">${d.subtitle}</p>
              </div>
            </div>
          </div>
        `;
      }
    },

    'feature-row-image-right': {
      id: 'feature-row-image-right',
      name: 'Text + Image Right',
      category: 'media',
      icon: '◨',
      desc: 'Heading + text with image placeholder',
      defaultData: {
        heading: 'GRUB vs Limine',
        body: 'Body paragraph placeholder — explains the choice between bootloaders, why Limine pairs better with Snapper rollback, plain-language rationale in 3-4 sentences.',
        imageLabel: '[ screenshot: bootloader menu ]'
      },
      render: function (data) {
        const d = data || this.defaultData;
        return `
          <div class="wf-block" data-type="feature-row-image-right">
            <div class="wf-content-container">
              <div class="wf-feature-row">
                <div class="wf-feature-text">
                  <h2 class="wf-feature-heading" contenteditable="true" spellcheck="false">${d.heading}</h2>
                  <p class="wf-feature-body" contenteditable="true" spellcheck="false">${d.body}</p>
                </div>
                <div class="wf-image-placeholder" title="Click to edit label • Drag corner to resize">
                  <span class="wf-placeholder-label" contenteditable="true" spellcheck="false">${d.imageLabel}</span>
                  <span class="wf-placeholder-resize-handle" title="Drag to resize placeholder">⤡</span>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    },

    'feature-row-image-left': {
      id: 'feature-row-image-left',
      name: 'Image Left + Text',
      category: 'media',
      icon: '◧',
      desc: 'Image placeholder with heading + text',
      defaultData: {
        heading: 'Plymouth: Details Mode',
        body: 'Body paragraph placeholder — explains enabling Plymouth details mode for first-install diagnosis, switching to a themed splash later.',
        imageLabel: '[ GIF: Plymouth boot splash, details mode ]'
      },
      render: function (data) {
        const d = data || this.defaultData;
        return `
          <div class="wf-block" data-type="feature-row-image-left">
            <div class="wf-content-container">
              <div class="wf-feature-row">
                <div class="wf-image-placeholder" title="Click to edit label • Drag corner to resize">
                  <span class="wf-placeholder-label" contenteditable="true" spellcheck="false">${d.imageLabel}</span>
                  <span class="wf-placeholder-resize-handle" title="Drag to resize placeholder">⤡</span>
                </div>
                <div class="wf-feature-text">
                  <h2 class="wf-feature-heading" contenteditable="true" spellcheck="false">${d.heading}</h2>
                  <p class="wf-feature-body" contenteditable="true" spellcheck="false">${d.body}</p>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    },

    'callout-warning': {
      id: 'callout-warning',
      name: 'Warning Callout',
      category: 'callouts',
      icon: '⚠️',
      desc: 'Amber warning alert banner',
      defaultData: {
        text: "Callout placeholder — e.g. 'Keep Unified Kernel Image disabled for now, see why below.'",
        type: 'warning'
      },
      render: function (data) {
        const d = data || this.defaultData;
        return `
          <div class="wf-block" data-type="callout-warning">
            <div class="wf-content-container" style="padding-top: 8px; padding-bottom: 8px;">
              <div class="wf-callout wf-callout-${d.type || 'warning'}">
                <span class="wf-callout-icon">⚠</span>
                <span class="wf-callout-text" contenteditable="true" spellcheck="false">${d.text}</span>
                <button class="wf-callout-type-switcher" title="Cycle alert style">Change Style</button>
              </div>
            </div>
          </div>
        `;
      }
    },

    'callout-danger': {
      id: 'callout-danger',
      name: 'Danger / Error Alert',
      category: 'callouts',
      icon: '🛑',
      desc: 'Red critical notification',
      defaultData: {
        text: 'Warning: This action will overwrite partition tables. Backup your critical data first!'
      },
      render: function (data) {
        const d = data || this.defaultData;
        return `
          <div class="wf-block" data-type="callout-danger">
            <div class="wf-content-container" style="padding-top: 8px; padding-bottom: 8px;">
              <div class="wf-callout wf-callout-danger">
                <span class="wf-callout-icon">⛔</span>
                <span class="wf-callout-text" contenteditable="true" spellcheck="false">${d.text}</span>
                <button class="wf-callout-type-switcher" title="Cycle alert style">Change Style</button>
              </div>
            </div>
          </div>
        `;
      }
    },

    'callout-info': {
      id: 'callout-info',
      name: 'Info Callout',
      category: 'callouts',
      icon: 'ℹ️',
      desc: 'Blue informational callout',
      defaultData: {
        text: 'Note: Limine automatically detects dual-boot Windows installations on UEFI systems.'
      },
      render: function (data) {
        const d = data || this.defaultData;
        return `
          <div class="wf-block" data-type="callout-info">
            <div class="wf-content-container" style="padding-top: 8px; padding-bottom: 8px;">
              <div class="wf-callout wf-callout-info">
                <span class="wf-callout-icon">ℹ️</span>
                <span class="wf-callout-text" contenteditable="true" spellcheck="false">${d.text}</span>
                <button class="wf-callout-type-switcher" title="Cycle alert style">Change Style</button>
              </div>
            </div>
          </div>
        `;
      }
    },

    'callout-success': {
      id: 'callout-success',
      name: 'Success Callout',
      category: 'callouts',
      icon: '✅',
      desc: 'Green success confirmation',
      defaultData: {
        text: 'Configuration verified: All boot entries have been written to the EFI system partition.'
      },
      render: function (data) {
        const d = data || this.defaultData;
        return `
          <div class="wf-block" data-type="callout-success">
            <div class="wf-content-container" style="padding-top: 8px; padding-bottom: 8px;">
              <div class="wf-callout wf-callout-success">
                <span class="wf-callout-icon">✅</span>
                <span class="wf-callout-text" contenteditable="true" spellcheck="false">${d.text}</span>
                <button class="wf-callout-type-switcher" title="Cycle alert style">Change Style</button>
              </div>
            </div>
          </div>
        `;
      }
    },

    'comparison-grid': {
      id: 'comparison-grid',
      name: 'Before / After Grid',
      category: 'media',
      icon: '⚖️',
      desc: 'Side-by-side comparison cards',
      defaultData: {
        title: 'Vanilla vs Configured — Example',
        beforeLabel: '[ screenshot: default/unconfigured ]',
        beforeCaption: 'Before (vanilla default)',
        afterLabel: '[ screenshot/gif: usability config applied ]',
        afterCaption: 'After (SimpleArch minimal config)'
      },
      render: function (data) {
        const d = data || this.defaultData;
        return `
          <div class="wf-block" data-type="comparison-grid">
            <div class="wf-content-container">
              <div class="wf-comparison-section">
                <h3 class="wf-comparison-title" contenteditable="true" spellcheck="false">${d.title}</h3>
                <div class="wf-comparison-grid">
                  <div class="wf-comparison-col">
                    <div class="wf-image-placeholder">
                      <span class="wf-placeholder-label" contenteditable="true" spellcheck="false">${d.beforeLabel}</span>
                      <span class="wf-placeholder-resize-handle" title="Drag to resize placeholder">⤡</span>
                    </div>
                    <div class="wf-comparison-caption" contenteditable="true" spellcheck="false">${d.beforeCaption}</div>
                  </div>
                  <div class="wf-comparison-col">
                    <div class="wf-image-placeholder">
                      <span class="wf-placeholder-label" contenteditable="true" spellcheck="false">${d.afterLabel}</span>
                      <span class="wf-placeholder-resize-handle" title="Drag to resize placeholder">⤡</span>
                    </div>
                    <div class="wf-comparison-caption" contenteditable="true" spellcheck="false">${d.afterCaption}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    },

    'pagination-buttons': {
      id: 'pagination-buttons',
      name: 'Prev / Next Nav',
      category: 'nav',
      icon: '⇄',
      desc: '← Back & Next → action buttons',
      defaultData: {
        backLabel: '← Back: Swap',
        nextLabel: 'Next: Kernel →'
      },
      render: function (data) {
        const d = data || this.defaultData;
        return `
          <div class="wf-block" data-type="pagination-buttons">
            <div class="wf-content-container" style="padding-top: 8px;">
              <footer class="wf-pagination-nav">
                <button class="wf-btn-back" contenteditable="true" spellcheck="false">${d.backLabel}</button>
                <button class="wf-btn-next" contenteditable="true" spellcheck="false">${d.nextLabel}</button>
              </footer>
            </div>
          </div>
        `;
      }
    },

    'image-placeholder': {
      id: 'image-placeholder',
      name: 'Image Placeholder',
      category: 'media',
      icon: '🖼️',
      desc: '[ screenshot: description ]',
      defaultData: {
        label: '[ screenshot: application overview mockup ]'
      },
      render: function (data) {
        const d = data || this.defaultData;
        return `
          <div class="wf-block" data-type="image-placeholder">
            <div class="wf-content-container">
              <div class="wf-image-placeholder" style="min-height: 240px;">
                <span class="wf-placeholder-label" contenteditable="true" spellcheck="false">${d.label}</span>
                <span class="wf-placeholder-resize-handle" title="Drag to resize placeholder">⤡</span>
              </div>
            </div>
          </div>
        `;
      }
    },

    'sidebar-layout': {
      id: 'sidebar-layout',
      name: 'Sidebar Nav Menu',
      category: 'nav',
      icon: '📑',
      desc: 'Vertical navigation sidebar menu',
      defaultData: {
        category: 'DOCUMENTATION',
        items: ['Overview', 'Installation', 'Configuration', 'Bootloader', 'Troubleshooting']
      },
      render: function (data) {
        const d = data || this.defaultData;
        const itemsHtml = d.items.map((item, idx) => {
          const cls = idx === 3 ? 'wf-side-menu-item active' : 'wf-side-menu-item';
          return `<div class="${cls}" contenteditable="true" spellcheck="false">${item}</div>`;
        }).join('');
        return `
          <div class="wf-block" data-type="sidebar-layout">
            <div class="wf-content-container">
              <div class="wf-sidebar-layout">
                <div class="wf-side-menu">
                  <div class="wf-side-menu-title" contenteditable="true" spellcheck="false">${d.category}</div>
                  ${itemsHtml}
                </div>
                <div class="wf-side-main">
                  <h3 contenteditable="true" spellcheck="false" style="font-size: 18px; font-weight: 700;">Section Workspace</h3>
                  <p contenteditable="true" spellcheck="false" style="font-size: 14px; color: var(--wf-text-muted);">
                    Select any topic from the navigation on the left to review configuration details and checklists.
                  </p>
                  <div class="wf-image-placeholder" style="min-height: 140px; margin-top: 10px;">
                    <span class="wf-placeholder-label">[ preview: nested workspace content ]</span>
                    <span class="wf-placeholder-resize-handle">⤡</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    },

    'video-placeholder': {
      id: 'video-placeholder',
      name: 'Video / GIF Player',
      category: 'media',
      icon: '🎬',
      desc: '[ GIF: playback placeholder ]',
      defaultData: {
        label: '[ GIF / Video: 60fps walkthrough recording ]'
      },
      render: function (data) {
        const d = data || this.defaultData;
        return `
          <div class="wf-block" data-type="video-placeholder">
            <div class="wf-content-container">
              <div class="wf-video-placeholder">
                <div class="wf-video-play-icon">▶</div>
                <span class="wf-placeholder-label" contenteditable="true" spellcheck="false">${d.label}</span>
              </div>
            </div>
          </div>
        `;
      }
    },

    'avatar-placeholder': {
      id: 'avatar-placeholder',
      name: 'Avatar / User Card',
      category: 'media',
      icon: '👤',
      desc: 'Circular avatar with bio',
      defaultData: {
        name: 'Alex Rivera',
        role: 'Systems Engineer & Maintainer',
        bio: 'Focused on minimal Linux desktop environments, kernel packaging, and reproducible builds.'
      },
      render: function (data) {
        const d = data || this.defaultData;
        return `
          <div class="wf-block" data-type="avatar-placeholder">
            <div class="wf-content-container">
              <div style="display: flex; align-items: center; gap: 16px; padding: 16px; background: var(--wf-card-bg); border: 1px solid var(--wf-border); border-radius: 6px;">
                <div style="width: 56px; height: 56px; border-radius: 50%; background: var(--wf-ph-bg); border: 2px dashed var(--wf-ph-border); display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0;">👤</div>
                <div>
                  <div style="font-weight: 700; font-size: 16px;" contenteditable="true" spellcheck="false">${d.name}</div>
                  <div style="font-size: 13px; color: var(--wf-text-muted);" contenteditable="true" spellcheck="false">${d.role}</div>
                  <div style="font-size: 13px; color: var(--wf-text-muted); margin-top: 4px;" contenteditable="true" spellcheck="false">${d.bio}</div>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    },

    'section-heading': {
      id: 'section-heading',
      name: 'Section Heading',
      category: 'text',
      icon: '#',
      desc: 'H2 Heading with optional subhead',
      defaultData: {
        title: 'Core Architecture Overview',
        subtitle: 'Understanding the underlying boot partition topology.'
      },
      render: function (data) {
        const d = data || this.defaultData;
        return `
          <div class="wf-block" data-type="section-heading">
            <div class="wf-content-container" style="padding-top: 14px; padding-bottom: 6px;">
              <h2 style="font-size: 24px; font-weight: 700; color: var(--wf-text); margin-bottom: 4px;" contenteditable="true" spellcheck="false">${d.title}</h2>
              <p style="font-size: 14px; color: var(--wf-text-muted);" contenteditable="true" spellcheck="false">${d.subtitle}</p>
            </div>
          </div>
        `;
      }
    },

    'paragraph-block': {
      id: 'paragraph-block',
      name: 'Paragraph Block',
      category: 'text',
      icon: '¶',
      desc: 'Body copy paragraph placeholder',
      defaultData: {
        text: 'This is a body paragraph placeholder. You can click anywhere to directly type your custom notes, specifications, copy text, or wireframing annotations. Every single change is autosaved in real-time.'
      },
      render: function (data) {
        const d = data || this.defaultData;
        return `
          <div class="wf-block" data-type="paragraph-block">
            <div class="wf-content-container" style="padding-top: 6px; padding-bottom: 6px;">
              <p style="font-size: 15px; line-height: 1.6; color: var(--wf-text);" contenteditable="true" spellcheck="false">${d.text}</p>
            </div>
          </div>
        `;
      }
    },

    'checklist-block': {
      id: 'checklist-block',
      name: 'Interactive Checklist',
      category: 'text',
      icon: '☑️',
      desc: 'Checkboxes you can click to check',
      defaultData: {
        items: [
          { text: 'Verify UEFI ESP partition exists at /boot/efi', checked: true },
          { text: 'Install limine or grub bootloader package', checked: true },
          { text: 'Generate unified kernel image (UKI) with dracut/mkinitcpio', checked: false },
          { text: 'Set NVRAM efibootmgr entry with correct UUID', checked: false }
        ]
      },
      render: function (data) {
        const d = data || this.defaultData;
        const itemsHtml = d.items.map(item => `
          <div class="wf-check-item ${item.checked ? 'checked' : ''}">
            <div class="wf-checkbox">${item.checked ? '✓' : ''}</div>
            <span class="wf-check-text" contenteditable="true" spellcheck="false">${item.text}</span>
          </div>
        `).join('');
        return `
          <div class="wf-block" data-type="checklist-block">
            <div class="wf-content-container">
              <div class="wf-checklist">
                ${itemsHtml}
              </div>
            </div>
          </div>
        `;
      }
    },

    'code-block': {
      id: 'code-block',
      name: 'Code Snippet Box',
      category: 'text',
      icon: '💻',
      desc: 'Monospace terminal / code block',
      defaultData: {
        filename: 'terminal — /etc/default/limine.conf',
        code: `# Limine Bootloader Configuration\ntimeout: 5\ndefault_entry: 1\n\n/Arch Linux (Zen Kernel)\n  protocol: linux\n  path: boot():/vmlinuz-linux-zen\n  cmdline: root=UUID=5f3b7c2a-9e1d rw quiet splash`
      },
      render: function (data) {
        const d = data || this.defaultData;
        return `
          <div class="wf-block" data-type="code-block">
            <div class="wf-content-container">
              <div class="wf-code-block">
                <div class="wf-code-header">
                  <span contenteditable="true" spellcheck="false">${d.filename}</span>
                  <span style="font-size: 11px; opacity: 0.7;">BASH</span>
                </div>
                <div class="wf-code-content" contenteditable="true" spellcheck="false">${d.code}</div>
              </div>
            </div>
          </div>
        `;
      }
    },

    'table-block': {
      id: 'table-block',
      name: 'Data Table',
      category: 'text',
      icon: '📊',
      desc: 'Editable rows, columns & headers',
      defaultData: {
        headers: ['Feature', 'GRUB', 'Limine', 'systemd-boot'],
        rows: [
          ['Btrfs Snapshots', 'Supported (grub-btrfs)', 'Native hook', 'Manual hooks'],
          ['Config Complexity', 'High (grub-mkconfig)', 'Low (plain text)', 'Moderate'],
          ['Boot Speed', 'Moderate (~1.8s)', 'Fast (~0.4s)', 'Fast (~0.3s)']
        ]
      },
      render: function (data) {
        const d = data || this.defaultData;
        const thHtml = d.headers.map(h => `<th contenteditable="true" spellcheck="false">${h}</th>`).join('');
        const trHtml = d.rows.map(r => `
          <tr>
            ${r.map(c => `<td contenteditable="true" spellcheck="false">${c}</td>`).join('')}
          </tr>
        `).join('');
        return `
          <div class="wf-block" data-type="table-block">
            <div class="wf-content-container">
              <div class="wf-table-wrapper">
                <table class="wf-table">
                  <thead>
                    <tr>${thHtml}</tr>
                  </thead>
                  <tbody>
                    ${trHtml}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        `;
      }
    },

    'accordion-block': {
      id: 'accordion-block',
      name: 'Interactive Accordion',
      category: 'text',
      icon: '🗂️',
      desc: 'Click to expand / collapse details',
      defaultData: {
        title: 'Frequently Asked Questions: Limine vs GRUB for Arch',
        content: 'Limine uses a straightforward text configuration format without complex M4 shell scripting. It pairs seamlessly with btrfs snapshot rollbacks and Plymouth graphical boot screens.'
      },
      render: function (data) {
        const d = data || this.defaultData;
        return `
          <div class="wf-block" data-type="accordion-block">
            <div class="wf-content-container" style="padding-top: 6px; padding-bottom: 6px;">
              <div class="wf-accordion open">
                <div class="wf-accordion-header">
                  <span contenteditable="true" spellcheck="false">${d.title}</span>
                  <span class="wf-accordion-icon">▾</span>
                </div>
                <div class="wf-accordion-body" contenteditable="true" spellcheck="false">${d.content}</div>
              </div>
            </div>
          </div>
        `;
      }
    },

    'button-row': {
      id: 'button-row',
      name: 'Button Group',
      category: 'controls',
      icon: '🔘',
      desc: 'Primary, secondary & outline buttons',
      defaultData: {
        btn1: 'Primary Action',
        btn2: 'Secondary Button',
        btn3: 'Outline Action'
      },
      render: function (data) {
        const d = data || this.defaultData;
        return `
          <div class="wf-block" data-type="button-row">
            <div class="wf-content-container" style="padding-top: 6px; padding-bottom: 6px;">
              <div class="wf-button-row">
                <button class="wf-btn-demo wf-btn-primary" contenteditable="true" spellcheck="false">${d.btn1}</button>
                <button class="wf-btn-demo wf-btn-secondary" contenteditable="true" spellcheck="false">${d.btn2}</button>
                <button class="wf-btn-demo wf-btn-outline" contenteditable="true" spellcheck="false">${d.btn3}</button>
              </div>
            </div>
          </div>
        `;
      }
    },

    'form-inputs': {
      id: 'form-inputs',
      name: 'Form Input Group',
      category: 'controls',
      icon: '📝',
      desc: 'Textfield, select menu & toggle',
      defaultData: {
        label1: 'Hostname / Target Machine',
        placeholder1: 'arch-workstation',
        label2: 'Kernel Package Variant',
        option2: 'linux-zen (Enhanced desktop performance)'
      },
      render: function (data) {
        const d = data || this.defaultData;
        return `
          <div class="wf-block" data-type="form-inputs">
            <div class="wf-content-container">
              <div class="wf-form-group">
                <div class="wf-field">
                  <label class="wf-field-label" contenteditable="true" spellcheck="false">${d.label1}</label>
                  <input type="text" class="wf-input" placeholder="${d.placeholder1}">
                </div>
                <div class="wf-field">
                  <label class="wf-field-label" contenteditable="true" spellcheck="false">${d.label2}</label>
                  <select class="wf-input">
                    <option>${d.option2}</option>
                    <option>linux-lts (Long term stable)</option>
                    <option>linux-hardened (Security profile)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    },

    'tabs-component': {
      id: 'tabs-component',
      name: 'Interactive Tabs',
      category: 'controls',
      icon: '🗂',
      desc: 'Tab 1, Tab 2, Tab 3 switcher',
      defaultData: {
        tabs: ['Limine Configuration', 'GRUB Settings', 'Plymouth Splash'],
        content: 'Here you can wireframe tabbed configurations. Clicking between the tabs in preview mode smoothly changes content!'
      },
      render: function (data) {
        const d = data || this.defaultData;
        return `
          <div class="wf-block" data-type="tabs-component">
            <div class="wf-content-container">
              <div class="wf-tabs">
                <button class="wf-tab-btn active" data-tab="0" contenteditable="true" spellcheck="false">${d.tabs[0]}</button>
                <button class="wf-tab-btn" data-tab="1" contenteditable="true" spellcheck="false">${d.tabs[1]}</button>
                <button class="wf-tab-btn" data-tab="2" contenteditable="true" spellcheck="false">${d.tabs[2]}</button>
              </div>
              <div class="wf-tab-panel" contenteditable="true" spellcheck="false">
                ${d.content}
              </div>
            </div>
          </div>
        `;
      }
    },

    'card-grid-3': {
      id: 'card-grid-3',
      name: '3-Card Grid',
      category: 'controls',
      icon: '🔲',
      desc: 'Three equal feature / metric cards',
      defaultData: {
        card1: { title: 'Fast Boot Times', body: 'Sub-second bootloader handoff to the Linux kernel.' },
        card2: { title: 'Snapper Rollback', body: 'Boot directly into read-only btrfs snapshots from the menu.' },
        card3: { title: 'UKI Ready', body: 'Unified Kernel Image support with TPM2 PCR measured boot.' }
      },
      render: function (data) {
        const d = data || this.defaultData;
        return `
          <div class="wf-block" data-type="card-grid-3">
            <div class="wf-content-container">
              <div class="wf-card-grid">
                <div class="wf-card">
                  <div class="wf-card-title" contenteditable="true" spellcheck="false">${d.card1.title}</div>
                  <div class="wf-card-body" contenteditable="true" spellcheck="false">${d.card1.body}</div>
                </div>
                <div class="wf-card">
                  <div class="wf-card-title" contenteditable="true" spellcheck="false">${d.card2.title}</div>
                  <div class="wf-card-body" contenteditable="true" spellcheck="false">${d.card2.body}</div>
                </div>
                <div class="wf-card">
                  <div class="wf-card-title" contenteditable="true" spellcheck="false">${d.card3.title}</div>
                  <div class="wf-card-body" contenteditable="true" spellcheck="false">${d.card3.body}</div>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    },

    'badge-cloud': {
      id: 'badge-cloud',
      name: 'Tags & Badges',
      category: 'callouts',
      icon: '🏷️',
      desc: 'Clickable tag chips / labels',
      defaultData: {
        tags: ['UEFI', 'x86_64', 'Btrfs', 'UKI', 'Limine', 'Plymouth', 'systemd']
      },
      render: function (data) {
        const d = data || this.defaultData;
        const tagsHtml = d.tags.map(t => `<span class="wf-tag" contenteditable="true" spellcheck="false">${t}</span>`).join('');
        return `
          <div class="wf-block" data-type="badge-cloud">
            <div class="wf-content-container" style="padding-top: 4px; padding-bottom: 4px;">
              <div class="wf-tag-cloud">
                ${tagsHtml}
              </div>
            </div>
          </div>
        `;
      }
    },

    'divider-line': {
      id: 'divider-line',
      name: 'Divider / Separator',
      category: 'controls',
      icon: '―',
      desc: 'Horizontal spacing line',
      render: function () {
        return `
          <div class="wf-block" data-type="divider-line">
            <div class="wf-content-container" style="padding-top: 4px; padding-bottom: 4px;">
              <div class="wf-divider"></div>
            </div>
          </div>
        `;
      }
    }
  };

  // ==========================================================================
  // Layout Templates (Presets)
  // ==========================================================================

  const TEMPLATES = {
    // 1. Exact match for ~/Pictures/screenshot-2026-09-21_20-14-55.png!
    'simplearch': [
      'navbar',
      'breadcrumbs',
      'stepper-dashes',
      'page-header',
      'feature-row-image-right',
      'feature-row-image-left',
      'callout-warning',
      'comparison-grid',
      'pagination-buttons'
    ],

    // 2. Dashboard layout with sidebar navigation
    'dashboard': [
      'navbar',
      'breadcrumbs',
      'sidebar-layout',
      'card-grid-3',
      'callout-info',
      'table-block',
      'checklist-block',
      'button-row'
    ],

    // 3. SaaS Landing Page
    'landing': [
      'navbar',
      'page-header',
      'card-grid-3',
      'feature-row-image-right',
      'feature-row-image-left',
      'video-placeholder',
      'accordion-block',
      'badge-cloud',
      'pagination-buttons'
    ],

    // 4. Docs article
    'docs': [
      'navbar',
      'breadcrumbs',
      'page-header',
      'paragraph-block',
      'code-block',
      'callout-warning',
      'checklist-block',
      'pagination-buttons'
    ],

    // 5. Blank
    'blank': []
  };

  // ==========================================================================
  // Application State
  // ==========================================================================

  const state = {
    mode: 'edit', // 'edit' or 'preview'
    layoutMode: 'flow', // 'flow' or 'freeform'
    snapGrid: true, // 20px grid
    theme: 'theme-clean',
    viewportWidth: '100%',
    selectedElement: null,
    history: [],
    historyIndex: -1,
    isRestoringHistory: false,
    insertTargetIndex: null,
    insertTargetCoords: null
  };

  // DOM Elements cache
  const elements = {
    body: document.body,
    canvasContainer: document.getElementById('canvas-container'),
    canvasPage: document.getElementById('wireframe-page'),
    paletteSidebar: document.getElementById('palette-sidebar'),
    btnTogglePalette: document.getElementById('btn-toggle-palette'),
    btnModeEdit: document.getElementById('btn-mode-edit'),
    btnModePreview: document.getElementById('btn-mode-preview'),
    btnLayoutFlow: document.getElementById('btn-layout-flow'),
    btnLayoutFreeform: document.getElementById('btn-layout-freeform'),
    chkSnapGrid: document.getElementById('chk-snap-grid'),
    templateSelect: document.getElementById('template-select'),
    themeSelect: document.getElementById('theme-select'),
    btnUndo: document.getElementById('btn-undo'),
    btnRedo: document.getElementById('btn-redo'),
    btnClearCanvas: document.getElementById('btn-clear-canvas'),
    btnExportMenu: document.getElementById('btn-export-menu'),
    exportDropdown: document.querySelector('.studio-dropdown'),
    btnExportHtml: document.getElementById('btn-export-html'),
    btnExportJson: document.getElementById('btn-export-json'),
    btnImportJsonTrigger: document.getElementById('btn-import-json-trigger'),
    inputImportJson: document.getElementById('input-import-json'),
    btnPrint: document.getElementById('btn-print'),
    viewportBtns: document.querySelectorAll('.viewport-btn'),
    paletteSearch: document.getElementById('palette-search'),
    paletteCategories: document.getElementById('palette-categories'),
    canvasElementCount: document.getElementById('canvas-element-count'),
    btnQuickAddBottom: document.getElementById('btn-quick-add-bottom'),
    floatingBar: document.getElementById('element-floating-bar'),
    floatingBarLabel: document.getElementById('floating-bar-label'),
    floatingDragHandle: document.getElementById('floating-drag-handle'),
    floatingSizeBadge: document.getElementById('floating-size-badge'),
    barWidthBtns: document.querySelectorAll('.bar-w-btn'),
    floatingBtnUp: document.getElementById('floating-btn-up'),
    floatingBtnDown: document.getElementById('floating-btn-down'),
    floatingBtnDuplicate: document.getElementById('floating-btn-duplicate'),
    floatingBtnInsertBelow: document.getElementById('floating-btn-insert-below'),
    floatingBtnDelete: document.getElementById('floating-btn-delete'),
    quickPickerModal: document.getElementById('quick-picker-modal'),
    pickerCloseBtn: document.getElementById('picker-close-btn'),
    pickerSearchInput: document.getElementById('picker-search-input'),
    pickerGrid: document.getElementById('picker-grid'),
    toast: document.getElementById('toast'),
    canvasBottomResizer: document.getElementById('canvas-bottom-resizer'),
    canvasEdgeResizer: document.getElementById('canvas-edge-resizer'),
    canvasHeightLabel: document.getElementById('canvas-height-label'),
    btnQuickExpand: document.getElementById('btn-quick-expand'),
    btnFitContent: document.getElementById('btn-fit-content')
  };

  // ==========================================================================
  // Initialization
  // ==========================================================================

  function init() {
    setupEventListeners();
    setupInteractions();
    setupPaletteCategoryCollapsing();
    setupQuickPicker();
    setupUniversalDragAndResize();
    setupCanvasHeightResizer();

    // Check localStorage for saved session or load SimpleArch screenshot match
    // Ensure clean cache on version update
    const versionKey = 'livewire_v3_clean';
    if (!localStorage.getItem(versionKey)) {
      localStorage.removeItem('livewire_canvas_html');
      localStorage.setItem(versionKey, 'true');
    }

    const saved = localStorage.getItem('livewire_canvas_html');
    const savedLayout = localStorage.getItem('livewire_layout_mode');
    const savedHeight = localStorage.getItem('livewire_canvas_height');

    if (savedLayout === 'freeform') {
      setLayoutMode('freeform', false);
    }

    if (savedHeight) {
      const h = parseInt(savedHeight, 10);
      if (!isNaN(h) && h >= 400) {
        elements.canvasPage.style.minHeight = `${h}px`;
        elements.canvasPage.style.height = `${h}px`;
        if (elements.canvasHeightLabel) {
          elements.canvasHeightLabel.textContent = `Drag down to expand canvas height (${h}px)`;
        }
      }
    }

    if (saved && saved.trim()) {
      elements.canvasPage.innerHTML = saved;
      decorateAllBlocks();
      updateElementCount();
      pushHistory();
    } else {
      loadTemplate('simplearch');
    }

    showToast('LiveWire ready! Move, resize, spawn & delete elements freely.');
  }

  // ==========================================================================
  // Block Decoration (Handles & Corner Quick Actions)
  // ==========================================================================

  function decorateBlock(block) {
    if (!block || !block.classList.contains('wf-block')) return;

    // Clean up duplicate quick bars
    const quickBars = block.querySelectorAll(':scope > .wf-block-quick-bar');
    if (quickBars.length > 1) {
      for (let i = 1; i < quickBars.length; i++) quickBars[i].remove();
    } else if (quickBars.length === 0) {
      const quickBar = document.createElement('div');
      quickBar.className = 'wf-block-quick-bar';
      quickBar.innerHTML = `
        <button class="wf-quick-btn quick-drag" title="Drag to move element">⠿</button>
        <button class="wf-quick-btn quick-duplicate" title="Duplicate element">❐</button>
        <button class="wf-quick-btn quick-delete" title="Delete element">🗑</button>
      `;
      block.appendChild(quickBar);
    }

    // Clean up duplicate resize handles
    const handles = ['n', 'e', 's', 'w', 'ne', 'nw', 'se', 'sw'];
    handles.forEach(h => {
      const existing = block.querySelectorAll(`:scope > .wf-handle-${h}`);
      if (existing.length > 1) {
        for (let i = 1; i < existing.length; i++) existing[i].remove();
      } else if (existing.length === 0) {
        const handleEl = document.createElement('div');
        handleEl.className = `wf-resize-handle wf-handle-${h}`;
        handleEl.dataset.handle = h;
        handleEl.title = `Drag to resize`;
        block.appendChild(handleEl);
      }
    });
  }

  function decorateAllBlocks() {
    elements.canvasPage.querySelectorAll('.wf-block').forEach(b => decorateBlock(b));
  }

  // ==========================================================================
  // Event Listeners & UI Binding
  // ==========================================================================

  function setupEventListeners() {
    // Mode toggles (Edit vs Live Preview)
    elements.btnModeEdit.addEventListener('click', () => setMode('edit'));
    elements.btnModePreview.addEventListener('click', () => setMode('preview'));

    // Layout mode toggles (Document Flow vs Freeform Board)
    elements.btnLayoutFlow.addEventListener('click', () => setLayoutMode('flow'));
    elements.btnLayoutFreeform.addEventListener('click', () => setLayoutMode('freeform'));

    // Snap to Grid checkbox
    elements.chkSnapGrid.addEventListener('change', (e) => {
      state.snapGrid = e.target.checked;
      showToast(state.snapGrid ? 'Grid snap enabled (20px)' : 'Grid snap disabled');
    });

    // Sidebar toggle
    elements.btnTogglePalette.addEventListener('click', () => {
      elements.paletteSidebar.classList.toggle('collapsed');
    });

    // Template select
    elements.templateSelect.addEventListener('change', (e) => {
      loadTemplate(e.target.value);
    });

    // Theme select
    elements.themeSelect.addEventListener('change', (e) => {
      setTheme(e.target.value);
    });

    // Viewport presets
    elements.viewportBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        elements.viewportBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const width = btn.dataset.width;
        elements.canvasPage.style.maxWidth = width;
        if (state.selectedElement) positionFloatingBar(state.selectedElement);
      });
    });

    // Undo / Redo
    elements.btnUndo.addEventListener('click', undo);
    elements.btnRedo.addEventListener('click', redo);

    // Keyboard Shortcuts (Ctrl+Z, Ctrl+Y, Delete, Escape)
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          redo();
        } else {
          e.preventDefault();
          undo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redo();
      } else if (e.key === 'Escape') {
        deselectElement();
        closeQuickPicker();
        elements.exportDropdown.classList.remove('open');
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        // Only delete element if an element is selected and user is NOT typing inside a contenteditable!
        const activeEl = document.activeElement;
        const isEditing = activeEl && activeEl.isContentEditable;
        if (!isEditing && state.selectedElement) {
          e.preventDefault();
          deleteElement(state.selectedElement);
        }
      }
    });

    // Clear Canvas
    elements.btnClearCanvas.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all elements from the canvas?')) {
        elements.canvasPage.innerHTML = '';
        deselectElement();
        updateElementCount();
        pushHistory();
        showToast('Canvas cleared');
      }
    });

    // Export Dropdown
    elements.btnExportMenu.addEventListener('click', (e) => {
      e.stopPropagation();
      elements.exportDropdown.classList.toggle('open');
    });

    window.addEventListener('click', (e) => {
      if (!elements.exportDropdown.contains(e.target)) {
        elements.exportDropdown.classList.remove('open');
      }
    });

    // Export HTML, JSON, Print
    elements.btnExportHtml.addEventListener('click', exportStandaloneHtml);
    elements.btnExportJson.addEventListener('click', exportJson);
    elements.btnImportJsonTrigger.addEventListener('click', () => {
      elements.inputImportJson.click();
    });
    elements.inputImportJson.addEventListener('change', importJson);
    elements.btnPrint.addEventListener('click', () => {
      elements.exportDropdown.classList.remove('open');
      window.print();
    });

    // Palette Search Filter
    elements.paletteSearch.addEventListener('input', (e) => {
      filterPaletteItems(e.target.value.toLowerCase());
    });

    // Palette items click (+) to add
    elements.paletteCategories.addEventListener('click', (e) => {
      const addBtn = e.target.closest('.item-add-btn');
      const itemEl = e.target.closest('.palette-item');
      if (addBtn || itemEl) {
        const type = (itemEl || addBtn.closest('.palette-item')).dataset.type;
        if (type) {
          spawnComponent(type);
        }
      }
    });

    // Quick Add Button at bottom of canvas
    elements.btnQuickAddBottom.addEventListener('click', () => {
      openQuickPicker(null);
    });

    // Floating action bar width presets
    elements.barWidthBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (!state.selectedElement) return;
        const w = btn.dataset.w;
        state.selectedElement.style.width = w;
        elements.barWidthBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updateFloatingSizeBadge(state.selectedElement);
        positionFloatingBar(state.selectedElement);
        pushHistory();
        saveToLocalStorage();
        showToast(`Element width set to ${w}`);
      });
    });

    // Floating action bar buttons
    elements.floatingBtnUp.addEventListener('click', () => {
      if (state.selectedElement) moveElement(state.selectedElement, -1);
    });
    elements.floatingBtnDown.addEventListener('click', () => {
      if (state.selectedElement) moveElement(state.selectedElement, 1);
    });
    elements.floatingBtnDuplicate.addEventListener('click', () => {
      if (state.selectedElement) duplicateElement(state.selectedElement);
    });
    elements.floatingBtnInsertBelow.addEventListener('click', () => {
      if (state.selectedElement) {
        const idx = getElementIndex(state.selectedElement);
        openQuickPicker(idx + 1);
      }
    });
    elements.floatingBtnDelete.addEventListener('click', () => {
      if (state.selectedElement) deleteElement(state.selectedElement);
    });

    // Canvas Double-click to place element in Freeform Mode
    elements.canvasPage.addEventListener('dblclick', (e) => {
      if (state.mode !== 'edit') return;
      // If clicked directly on canvas background (not on an element's text/button)
      if (e.target === elements.canvasPage || e.target.classList.contains('wf-content-container')) {
        const rect = elements.canvasPage.getBoundingClientRect();
        let clickX = e.clientX - rect.left;
        let clickY = e.clientY - rect.top;
        if (state.snapGrid) {
          clickX = Math.round(clickX / 20) * 20;
          clickY = Math.round(clickY / 20) * 20;
        }
        openQuickPicker(null, { x: clickX, y: clickY });
      }
    });

    // Canvas click delegation to select elements
    elements.canvasPage.addEventListener('click', (e) => {
      // In edit mode, clicking a block selects it
      if (state.mode === 'edit') {
        // Check corner action clicks directly on block
        const quickDel = e.target.closest('.quick-delete');
        if (quickDel) {
          const block = quickDel.closest('.wf-block');
          deleteElement(block);
          return;
        }
        const quickDup = e.target.closest('.quick-duplicate');
        if (quickDup) {
          const block = quickDup.closest('.wf-block');
          duplicateElement(block);
          return;
        }

        const block = e.target.closest('.wf-block');
        if (block && block.parentElement === elements.canvasPage) {
          selectElement(block);
        }
      }
    });

    // Deselect when clicking canvas background
    elements.canvasContainer.addEventListener('click', (e) => {
      if (e.target === elements.canvasContainer || e.target.id === 'canvas-wrapper') {
        deselectElement();
      }
    });

    // Inline edit autosave
    elements.canvasPage.addEventListener('input', debounce(() => {
      pushHistory();
      saveToLocalStorage();
    }, 500));

    // Palette Drag & Drop Setup
    setupPaletteDragAndDrop();
  }

  // ==========================================================================
  // Layout Modes (Flow vs Freeform Board)
  // ==========================================================================

  function setLayoutMode(mode, save = true) {
    state.layoutMode = mode;

    if (mode === 'freeform') {
      elements.btnLayoutFreeform.classList.add('active');
      elements.btnLayoutFlow.classList.remove('active');

      const canvasRect = elements.canvasPage.getBoundingClientRect();
      const blocks = Array.from(elements.canvasPage.children);

      // Convert from flow to absolute positions
      blocks.forEach(block => {
        if (!block.classList.contains('wf-block')) return;
        const rect = block.getBoundingClientRect();
        const top = block.offsetTop || (rect.top - canvasRect.top);
        const left = block.offsetLeft || 0;
        const width = block.offsetWidth;

        block.style.position = 'absolute';
        block.style.top = `${top}px`;
        block.style.left = `${left}px`;
        block.style.width = `${width}px`;
      });

      elements.canvasPage.classList.add('layout-freeform');
      if (state.selectedElement) positionFloatingBar(state.selectedElement);
      if (save) {
        localStorage.setItem('livewire_layout_mode', 'freeform');
        showToast('🎯 Freeform Board Mode: Click and drag elements anywhere!');
      }
    } else {
      elements.btnLayoutFlow.classList.add('active');
      elements.btnLayoutFreeform.classList.remove('active');

      // Sort blocks by their vertical top coordinate before returning to flow
      const blocks = Array.from(elements.canvasPage.children);
      blocks.sort((a, b) => {
        const topA = parseFloat(a.style.top) || a.offsetTop || 0;
        const topB = parseFloat(b.style.top) || b.offsetTop || 0;
        return topA - topB;
      });

      blocks.forEach(block => {
        if (!block.classList.contains('wf-block')) return;
        block.style.position = '';
        block.style.top = '';
        block.style.left = '';
        elements.canvasPage.appendChild(block);
      });

      elements.canvasPage.classList.remove('layout-freeform');
      if (state.selectedElement) positionFloatingBar(state.selectedElement);
      if (save) {
        localStorage.setItem('livewire_layout_mode', 'flow');
        showToast('📄 Document Flow Mode: responsive layout stacking');
      }
    }
  }

  // ==========================================================================
  // Universal Drag to Move & Interactive Resizing
  // ==========================================================================

  function setupUniversalDragAndResize() {
    let activeAction = null; // 'move' or 'resize' or 'resize-placeholder'
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;
    let startWidth = 0;
    let startHeight = 0;
    let targetElement = null;
    let targetPlaceholder = null;
    let resizeHandle = null;

    // Listen on document for mousedown on resize handles or drag handles
    document.addEventListener('mousedown', (e) => {
      if (state.mode !== 'edit') return;

      // 1. Image placeholder corner resize handle
      const phResize = e.target.closest('.wf-placeholder-resize-handle');
      if (phResize) {
        e.preventDefault();
        e.stopPropagation();
        activeAction = 'resize-placeholder';
        targetPlaceholder = phResize.closest('.wf-image-placeholder');
        startX = e.clientX;
        startY = e.clientY;
        startWidth = targetPlaceholder.offsetWidth;
        startHeight = targetPlaceholder.offsetHeight;
        document.body.style.cursor = 'nwse-resize';
        return;
      }

      // 2. Element 8-way resize handles
      const handle = e.target.closest('.wf-resize-handle');
      if (handle) {
        e.preventDefault();
        e.stopPropagation();
        activeAction = 'resize';
        resizeHandle = handle.dataset.handle;
        targetElement = handle.closest('.wf-block');
        startX = e.clientX;
        startY = e.clientY;
        startWidth = targetElement.offsetWidth;
        startHeight = targetElement.offsetHeight;
        startLeft = targetElement.offsetLeft;
        startTop = targetElement.offsetTop;
        document.body.style.cursor = window.getComputedStyle(handle).cursor;
        return;
      }

      // 3. Drag to Move Element
      const floatingDrag = e.target.closest('#floating-drag-handle');
      const quickDrag = e.target.closest('.quick-drag');
      const block = e.target.closest('.wf-block');

      // Check if clicking inside contenteditable, buttons, or form controls
      const isEditable = e.target.isContentEditable || e.target.closest('button, input, select, textarea');

      if ((floatingDrag && state.selectedElement) || quickDrag || (block && state.layoutMode === 'freeform' && !isEditable)) {
        targetElement = floatingDrag ? state.selectedElement : (quickDrag ? quickDrag.closest('.wf-block') : block);
        if (!targetElement) return;

        selectElement(targetElement);

        if (state.layoutMode === 'freeform') {
          e.preventDefault();
          activeAction = 'move';
          startX = e.clientX;
          startY = e.clientY;
          startLeft = targetElement.offsetLeft;
          startTop = targetElement.offsetTop;
          targetElement.classList.add('wf-dragging');
          document.body.style.cursor = 'move';
        }
      }
    });

    // Global Mousemove
    window.addEventListener('mousemove', (e) => {
      if (!activeAction) return;

      let dx = e.clientX - startX;
      let dy = e.clientY - startY;

      // 1. Placeholder Resize
      if (activeAction === 'resize-placeholder' && targetPlaceholder) {
        let newW = Math.max(120, startWidth + dx);
        let newH = Math.max(80, startHeight + dy);
        if (state.snapGrid) {
          newW = Math.round(newW / 20) * 20;
          newH = Math.round(newH / 20) * 20;
        }
        targetPlaceholder.style.width = `${newW}px`;
        targetPlaceholder.style.height = `${newH}px`;
        targetPlaceholder.style.minHeight = `${newH}px`;
        if (state.selectedElement) positionFloatingBar(state.selectedElement);
        return;
      }

      // 2. Element Resize
      if (activeAction === 'resize' && targetElement) {
        if (state.snapGrid) {
          dx = Math.round(dx / 20) * 20;
          dy = Math.round(dy / 20) * 20;
        }

        let newW = startWidth;
        let newH = startHeight;
        let newL = startLeft;
        let newT = startTop;

        if (resizeHandle.includes('e')) {
          newW = Math.max(120, startWidth + dx);
          targetElement.style.width = `${newW}px`;
        }
        if (resizeHandle.includes('s')) {
          newH = Math.max(40, startHeight + dy);
          targetElement.style.minHeight = `${newH}px`;
        }
        if (state.layoutMode === 'freeform') {
          if (resizeHandle.includes('w')) {
            newW = Math.max(120, startWidth - dx);
            newL = startLeft + (startWidth - newW);
            targetElement.style.width = `${newW}px`;
            targetElement.style.left = `${newL}px`;
          }
          if (resizeHandle.includes('n')) {
            newH = Math.max(40, startHeight - dy);
            newT = startTop + (startHeight - newH);
            targetElement.style.minHeight = `${newH}px`;
            targetElement.style.top = `${newT}px`;
          }
        }

        updateFloatingSizeBadge(targetElement);
        positionFloatingBar(targetElement);
        return;
      }

      // 3. Element Move (Freeform)
      if (activeAction === 'move' && targetElement) {
        let newLeft = startLeft + dx;
        let newTop = startTop + dy;

        if (state.snapGrid) {
          newLeft = Math.round(newLeft / 20) * 20;
          newTop = Math.round(newTop / 20) * 20;
        }

        newLeft = Math.max(0, newLeft);
        newTop = Math.max(0, newTop);

        targetElement.style.left = `${newLeft}px`;
        targetElement.style.top = `${newTop}px`;

        elements.floatingSizeBadge.textContent = `X: ${newLeft}px, Y: ${newTop}px`;
        positionFloatingBar(targetElement);
      }
    });

    // Global Mouseup
    window.addEventListener('mouseup', () => {
      if (activeAction) {
        if (targetElement) {
          targetElement.classList.remove('wf-dragging');
          updateFloatingSizeBadge(targetElement);
          positionFloatingBar(targetElement);
        }
        document.body.style.cursor = '';
        activeAction = null;
        targetElement = null;
        targetPlaceholder = null;
        resizeHandle = null;
        pushHistory();
        saveToLocalStorage();
      }
    });
  }

  // ==========================================================================
  // Canvas Vertical Height Drag & Expand
  // ==========================================================================

  function setupCanvasHeightResizer() {
    let isResizingCanvas = false;
    let startY = 0;
    let startHeight = 0;

    function onMouseDown(e) {
      if (state.mode !== 'edit') return;
      if (e.target.closest('button')) return;

      e.preventDefault();
      e.stopPropagation();

      isResizingCanvas = true;
      startY = e.clientY;
      startHeight = elements.canvasPage.offsetHeight;
      document.body.classList.add('resizing-canvas');
      document.body.style.cursor = 'ns-resize';
    }

    if (elements.canvasBottomResizer) {
      elements.canvasBottomResizer.addEventListener('mousedown', onMouseDown);
    }
    if (elements.canvasEdgeResizer) {
      elements.canvasEdgeResizer.addEventListener('mousedown', onMouseDown);
    }

    window.addEventListener('mousemove', (e) => {
      if (!isResizingCanvas) return;

      let dy = e.clientY - startY;
      let newH = Math.max(500, startHeight + dy);

      if (state.snapGrid) {
        newH = Math.round(newH / 20) * 20;
      }

      elements.canvasPage.style.minHeight = `${newH}px`;
      elements.canvasPage.style.height = `${newH}px`;

      if (elements.canvasHeightLabel) {
        elements.canvasHeightLabel.textContent = `Drag down to expand canvas height (${newH}px)`;
      }
    });

    window.addEventListener('mouseup', () => {
      if (isResizingCanvas) {
        isResizingCanvas = false;
        document.body.classList.remove('resizing-canvas');
        document.body.style.cursor = '';

        const finalH = elements.canvasPage.offsetHeight;
        localStorage.setItem('livewire_canvas_height', finalH);
        pushHistory();
        showToast(`Canvas height updated to ${finalH}px`);
      }
    });

    // Quick +400px Expand Button
    if (elements.btnQuickExpand) {
      elements.btnQuickExpand.addEventListener('click', (e) => {
        e.stopPropagation();
        const currentH = elements.canvasPage.offsetHeight;
        const newH = currentH + 400;
        elements.canvasPage.style.minHeight = `${newH}px`;
        elements.canvasPage.style.height = `${newH}px`;
        if (elements.canvasHeightLabel) {
          elements.canvasHeightLabel.textContent = `Drag down to expand canvas height (${newH}px)`;
        }
        localStorage.setItem('livewire_canvas_height', newH);
        pushHistory();
        elements.canvasBottomResizer.scrollIntoView({ behavior: 'smooth', block: 'end' });
        showToast(`Expanded canvas height by +400px (${newH}px)`);
      });
    }

    // Auto Fit Content Button
    if (elements.btnFitContent) {
      elements.btnFitContent.addEventListener('click', (e) => {
        e.stopPropagation();
        let targetH = 850;

        if (state.layoutMode === 'freeform') {
          const blocks = Array.from(elements.canvasPage.querySelectorAll('.wf-block'));
          let maxBottom = 600;
          blocks.forEach(b => {
            const bottom = (b.offsetTop || 0) + (b.offsetHeight || 0);
            if (bottom > maxBottom) maxBottom = bottom;
          });
          targetH = Math.max(700, maxBottom + 80);
        } else {
          // Flow mode: measure total height of elements
          elements.canvasPage.style.height = 'auto';
          targetH = Math.max(750, elements.canvasPage.scrollHeight + 40);
        }

        if (state.snapGrid) {
          targetH = Math.round(targetH / 20) * 20;
        }

        elements.canvasPage.style.minHeight = `${targetH}px`;
        elements.canvasPage.style.height = `${targetH}px`;
        if (elements.canvasHeightLabel) {
          elements.canvasHeightLabel.textContent = `Drag down to expand canvas height (${targetH}px)`;
        }
        localStorage.setItem('livewire_canvas_height', targetH);
        pushHistory();
        showToast(`Canvas height fitted to content (${targetH}px)`);
      });
    }
  }

  // ==========================================================================
  // Component Spawning & Canvas Operations
  // ==========================================================================

  function spawnComponent(type, targetIndex = null, coords = null) {
    const comp = COMPONENTS[type];
    if (!comp) return;

    const htmlString = comp.render();
    const temp = document.createElement('div');
    temp.innerHTML = htmlString.trim();
    const newBlock = temp.firstElementChild;
    decorateBlock(newBlock);

    const blocks = Array.from(elements.canvasPage.children);

    if (state.layoutMode === 'freeform') {
      newBlock.style.position = 'absolute';
      if (coords) {
        newBlock.style.left = `${coords.x}px`;
        newBlock.style.top = `${coords.y}px`;
      } else if (state.selectedElement) {
        newBlock.style.left = `${state.selectedElement.offsetLeft + 20}px`;
        newBlock.style.top = `${state.selectedElement.offsetTop + state.selectedElement.offsetHeight + 20}px`;
      } else {
        const lastBlock = blocks[blocks.length - 1];
        const nextY = lastBlock ? (lastBlock.offsetTop + lastBlock.offsetHeight + 20) : 40;
        newBlock.style.left = '40px';
        newBlock.style.top = `${nextY}px`;
      }
      elements.canvasPage.appendChild(newBlock);
    } else {
      // Document flow placement
      if (targetIndex !== null && targetIndex >= 0 && targetIndex < blocks.length) {
        elements.canvasPage.insertBefore(newBlock, blocks[targetIndex]);
      } else if (state.selectedElement && targetIndex === null) {
        elements.canvasPage.insertBefore(newBlock, state.selectedElement.nextSibling);
      } else {
        elements.canvasPage.appendChild(newBlock);
      }
    }

    selectElement(newBlock);
    newBlock.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    updateElementCount();
    pushHistory();
    saveToLocalStorage();
    showToast(`Added ${comp.name}`);
  }

  function deleteElement(el) {
    if (!el || !el.parentElement) return;
    const typeName = el.dataset.type || 'element';
    deselectElement();
    el.remove();
    updateElementCount();
    pushHistory();
    saveToLocalStorage();
    showToast(`Deleted ${typeName}`);
  }

  function duplicateElement(el) {
    if (!el || !el.parentElement) return;
    const clone = el.cloneNode(true);
    clone.classList.remove('wf-selected', 'wf-dragging');

    if (state.layoutMode === 'freeform') {
      const top = (el.offsetTop || 0) + 24;
      const left = (el.offsetLeft || 0) + 24;
      clone.style.top = `${top}px`;
      clone.style.left = `${left}px`;
      el.parentElement.appendChild(clone);
    } else {
      el.parentElement.insertBefore(clone, el.nextSibling);
    }

    decorateBlock(clone);
    selectElement(clone);
    updateElementCount();
    pushHistory();
    saveToLocalStorage();
    showToast('Element duplicated');
  }

  function moveElement(el, direction) {
    if (!el || !el.parentElement) return;
    if (state.layoutMode === 'freeform') {
      const currentTop = el.offsetTop || 0;
      el.style.top = `${Math.max(0, currentTop + (direction * 40))}px`;
      positionFloatingBar(el);
      pushHistory();
      saveToLocalStorage();
      return;
    }

    if (direction === -1) {
      // Move up
      const prev = el.previousElementSibling;
      if (prev) {
        el.parentElement.insertBefore(el, prev);
        positionFloatingBar(el);
        pushHistory();
        saveToLocalStorage();
      }
    } else if (direction === 1) {
      // Move down
      const next = el.nextElementSibling;
      if (next) {
        el.parentElement.insertBefore(next, el);
        positionFloatingBar(el);
        pushHistory();
        saveToLocalStorage();
      }
    }
  }

  function getElementIndex(el) {
    return Array.from(elements.canvasPage.children).indexOf(el);
  }

  function selectElement(el) {
    if (state.selectedElement) {
      state.selectedElement.classList.remove('wf-selected');
    }
    state.selectedElement = el;
    if (el) {
      el.classList.add('wf-selected');
      updateFloatingSizeBadge(el);
      positionFloatingBar(el);
    } else {
      elements.floatingBar.style.display = 'none';
    }
  }

  function deselectElement() {
    if (state.selectedElement) {
      state.selectedElement.classList.remove('wf-selected');
      state.selectedElement = null;
    }
    elements.floatingBar.style.display = 'none';
  }

  function updateFloatingSizeBadge(el) {
    if (!el) return;
    const w = el.style.width || `${Math.round(el.offsetWidth)}px`;
    const h = Math.round(el.offsetHeight);
    elements.floatingSizeBadge.textContent = `${w} × ${h}px`;

    // Update width button active state if matching
    elements.barWidthBtns.forEach(b => {
      b.classList.toggle('active', b.dataset.w === el.style.width);
    });
  }

  function positionFloatingBar(el) {
    if (state.mode !== 'edit' || !el) {
      elements.floatingBar.style.display = 'none';
      return;
    }

    const type = el.dataset.type || 'Element';
    const comp = COMPONENTS[type];
    elements.floatingBarLabel.textContent = comp ? comp.name : type;

    const rect = el.getBoundingClientRect();

    // Position floating bar relative to document
    const top = window.scrollY + rect.top;
    const left = window.scrollX + rect.left + 8;

    elements.floatingBar.style.display = 'flex';
    elements.floatingBar.style.top = `${top}px`;
    elements.floatingBar.style.left = `${left}px`;
  }

  // Update floating bar position on window scroll or resize
  window.addEventListener('scroll', () => {
    if (state.selectedElement) positionFloatingBar(state.selectedElement);
  }, true);

  window.addEventListener('resize', () => {
    if (state.selectedElement) positionFloatingBar(state.selectedElement);
  });

  // ==========================================================================
  // Interactive Component Behaviors
  // ==========================================================================

  function setupInteractions() {
    // Stepper dash toggles
    elements.canvasPage.addEventListener('click', (e) => {
      const dash = e.target.closest('.wf-dash');
      if (dash) {
        const container = dash.closest('.wf-stepper-dashes');
        const dashes = Array.from(container.querySelectorAll('.wf-dash'));
        const clickedIdx = parseInt(dash.dataset.index, 10);

        dashes.forEach((d, idx) => {
          if (idx <= clickedIdx) {
            d.className = 'wf-dash active';
          } else {
            d.className = 'wf-dash inactive';
          }
        });
        pushHistory();
        saveToLocalStorage();
        return;
      }

      // Stepper Add/Remove dash buttons
      const stepBtn = e.target.closest('.wf-stepper-btn');
      if (stepBtn) {
        const action = stepBtn.dataset.stepAction;
        const container = stepBtn.closest('.wf-stepper-dashes');
        const dashes = container.querySelectorAll('.wf-dash');
        if (action === 'add') {
          const newDash = document.createElement('div');
          newDash.className = 'wf-dash inactive';
          newDash.dataset.index = dashes.length;
          newDash.title = `Step ${dashes.length + 1} (Click to toggle)`;
          container.insertBefore(newDash, container.querySelector('.wf-stepper-controls'));
        } else if (action === 'remove' && dashes.length > 1) {
          dashes[dashes.length - 1].remove();
        }
        pushHistory();
        saveToLocalStorage();
        return;
      }

      // Checklist item checkbox toggle
      const checkItem = e.target.closest('.wf-check-item');
      if (checkItem && (e.target.closest('.wf-checkbox') || state.mode === 'preview')) {
        checkItem.classList.toggle('checked');
        const cb = checkItem.querySelector('.wf-checkbox');
        if (cb) {
          cb.textContent = checkItem.classList.contains('checked') ? '✓' : '';
        }
        pushHistory();
        saveToLocalStorage();
        return;
      }

      // Tabs switcher
      const tabBtn = e.target.closest('.wf-tab-btn');
      if (tabBtn) {
        const tabsRow = tabBtn.closest('.wf-tabs');
        const parent = tabsRow.parentElement;
        const allTabBtns = tabsRow.querySelectorAll('.wf-tab-btn');
        allTabBtns.forEach(b => b.classList.remove('active'));
        tabBtn.classList.add('active');

        // Update panel text sample
        const panel = parent.querySelector('.wf-tab-panel');
        if (panel && state.mode === 'preview') {
          panel.textContent = `Viewing active settings and options for: "${tabBtn.textContent.trim()}". All parameters can be configured live here.`;
        }
        return;
      }

      // Accordion toggle
      const accordionHeader = e.target.closest('.wf-accordion-header');
      if (accordionHeader) {
        const accordion = accordionHeader.closest('.wf-accordion');
        accordion.classList.toggle('open');
        return;
      }

      // Callout alert style switcher
      const calloutSwitcher = e.target.closest('.wf-callout-type-switcher');
      if (calloutSwitcher) {
        const callout = calloutSwitcher.closest('.wf-callout');
        const types = ['warning', 'danger', 'info', 'success'];
        const icons = { warning: '⚠', danger: '⛔', info: 'ℹ️', success: '✅' };
        let current = 'warning';
        types.forEach(t => {
          if (callout.classList.contains(`wf-callout-${t}`)) current = t;
        });
        const nextIdx = (types.indexOf(current) + 1) % types.length;
        const nextType = types[nextIdx];

        types.forEach(t => callout.classList.remove(`wf-callout-${t}`));
        callout.classList.add(`wf-callout-${nextType}`);
        const iconEl = callout.querySelector('.wf-callout-icon');
        if (iconEl) iconEl.textContent = icons[nextType];

        pushHistory();
        saveToLocalStorage();
        return;
      }

      // Add nav link button
      const addNavLink = e.target.closest('.wf-nav-add-link');
      if (addNavLink) {
        const newLink = document.createElement('span');
        newLink.className = 'wf-nav-link';
        newLink.contentEditable = 'true';
        newLink.spellcheck = false;
        newLink.textContent = 'New Link';
        addNavLink.parentElement.insertBefore(newLink, addNavLink);
        newLink.focus();
        pushHistory();
        saveToLocalStorage();
        return;
      }

      // Demo button click feedback
      const demoBtn = e.target.closest('.wf-btn-demo, .wf-btn-back, .wf-btn-next');
      if (demoBtn && state.mode === 'preview') {
        showToast(`Clicked: ${demoBtn.textContent.trim()}`);
      }

      // Sidebar item selection
      const sideItem = e.target.closest('.wf-side-menu-item');
      if (sideItem) {
        const sideMenu = sideItem.closest('.wf-side-menu');
        sideMenu.querySelectorAll('.wf-side-menu-item').forEach(i => i.classList.remove('active'));
        sideItem.classList.add('active');
      }
    });
  }

  // ==========================================================================
  // Palette Drag & Drop Functionality
  // ==========================================================================

  function setupPaletteDragAndDrop() {
    // 1. Dragging from Sidebar Palette
    const paletteItems = document.querySelectorAll('.palette-item');
    paletteItems.forEach(item => {
      item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', item.dataset.type);
        e.dataTransfer.effectAllowed = 'copy';
      });
    });

    // 2. Drag over canvas
    elements.canvasPage.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';

      if (state.layoutMode === 'flow') {
        const targetBlock = e.target.closest('.wf-block');
        clearDropIndicators();

        if (targetBlock && targetBlock.parentElement === elements.canvasPage) {
          const rect = targetBlock.getBoundingClientRect();
          const mid = rect.top + rect.height / 2;
          if (e.clientY < mid) {
            targetBlock.classList.add('wf-drop-above');
          } else {
            targetBlock.classList.add('wf-drop-below');
          }
        }
      }
    });

    elements.canvasPage.addEventListener('dragleave', (e) => {
      if (!elements.canvasPage.contains(e.relatedTarget)) {
        clearDropIndicators();
      }
    });

    elements.canvasPage.addEventListener('drop', (e) => {
      e.preventDefault();
      const type = e.dataTransfer.getData('text/plain');
      clearDropIndicators();

      if (!type || !COMPONENTS[type]) return;

      if (state.layoutMode === 'freeform') {
        const canvasRect = elements.canvasPage.getBoundingClientRect();
        let dropX = e.clientX - canvasRect.left;
        let dropY = e.clientY - canvasRect.top;
        if (state.snapGrid) {
          dropX = Math.round(dropX / 20) * 20;
          dropY = Math.round(dropY / 20) * 20;
        }
        spawnComponent(type, null, { x: dropX, y: dropY });
      } else {
        const targetBlock = e.target.closest('.wf-block');
        let insertIndex = null;
        if (targetBlock && targetBlock.parentElement === elements.canvasPage) {
          const idx = getElementIndex(targetBlock);
          const isAbove = targetBlock.classList.contains('wf-drop-above');
          insertIndex = isAbove ? idx : idx + 1;
        }
        spawnComponent(type, insertIndex);
      }
    });
  }

  function clearDropIndicators() {
    elements.canvasPage.querySelectorAll('.wf-drop-above, .wf-drop-below').forEach(el => {
      el.classList.remove('wf-drop-above', 'wf-drop-below');
    });
  }

  // ==========================================================================
  // Quick Insertion Modal / Popover
  // ==========================================================================

  function setupQuickPicker() {
    let gridHtml = '';
    Object.keys(COMPONENTS).forEach(id => {
      const c = COMPONENTS[id];
      gridHtml += `
        <div class="picker-card" data-type="${c.id}">
          <span class="picker-card-icon">${c.icon}</span>
          <div class="picker-card-info">
            <span class="picker-card-title">${c.name}</span>
            <span class="picker-card-desc">${c.desc}</span>
          </div>
        </div>
      `;
    });
    elements.pickerGrid.innerHTML = gridHtml;

    elements.pickerCloseBtn.addEventListener('click', closeQuickPicker);

    elements.quickPickerModal.addEventListener('click', (e) => {
      if (e.target === elements.quickPickerModal) closeQuickPicker();
    });

    elements.pickerGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.picker-card');
      if (card) {
        const type = card.dataset.type;
        spawnComponent(type, state.insertTargetIndex, state.insertTargetCoords);
        closeQuickPicker();
      }
    });

    elements.pickerSearchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      elements.pickerGrid.querySelectorAll('.picker-card').forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(q) ? 'flex' : 'none';
      });
    });
  }

  function openQuickPicker(targetIndex = null, coords = null) {
    state.insertTargetIndex = targetIndex;
    state.insertTargetCoords = coords;
    elements.pickerSearchInput.value = '';
    elements.pickerGrid.querySelectorAll('.picker-card').forEach(c => c.style.display = 'flex');
    elements.quickPickerModal.style.display = 'flex';
    setTimeout(() => elements.pickerSearchInput.focus(), 50);
  }

  function closeQuickPicker() {
    elements.quickPickerModal.style.display = 'none';
    state.insertTargetIndex = null;
    state.insertTargetCoords = null;
  }

  // ==========================================================================
  // View Modes & Themes
  // ==========================================================================

  function setMode(mode) {
    state.mode = mode;
    if (mode === 'preview') {
      elements.body.classList.add('mode-preview');
      elements.btnModePreview.classList.add('active');
      elements.btnModeEdit.classList.remove('active');
      deselectElement();
      showToast('Live Preview Mode: click controls & links to test interactive prototype');
    } else {
      elements.body.classList.remove('mode-preview');
      elements.btnModeEdit.classList.add('active');
      elements.btnModePreview.classList.remove('active');
      showToast('Edit Mode: move, resize, edit text, delete or spawn elements');
    }
  }

  function setTheme(theme) {
    state.theme = theme;
    elements.body.classList.remove('theme-clean', 'theme-blueprint', 'theme-dark', 'theme-sketch');
    elements.body.classList.add(theme);
    showToast(`Style set to: ${theme.replace('theme-', '').toUpperCase()}`);
  }

  function loadTemplate(name) {
    const list = TEMPLATES[name];
    if (!list) return;

    elements.canvasPage.innerHTML = '';
    list.forEach(type => {
      const comp = COMPONENTS[type];
      if (comp) {
        const temp = document.createElement('div');
        temp.innerHTML = comp.render().trim();
        const block = temp.firstElementChild;
        decorateBlock(block);
        elements.canvasPage.appendChild(block);
      }
    });

    if (state.layoutMode === 'freeform') {
      setLayoutMode('freeform', false);
    }

    deselectElement();
    updateElementCount();
    pushHistory();
    saveToLocalStorage();
    showToast(`Loaded template: ${elements.templateSelect.options[elements.templateSelect.selectedIndex].text}`);
  }

  // ==========================================================================
  // Undo / Redo & Local Storage
  // ==========================================================================

  function pushHistory() {
    if (state.isRestoringHistory) return;
    const html = elements.canvasPage.innerHTML;

    // Drop redo states
    state.history = state.history.slice(0, state.historyIndex + 1);
    state.history.push(html);

    if (state.history.length > 50) {
      state.history.shift();
    }
    state.historyIndex = state.history.length - 1;
    updateUndoRedoButtons();
  }

  function undo() {
    if (state.historyIndex > 0) {
      state.historyIndex--;
      restoreHistoryState();
      showToast('Undo');
    }
  }

  function redo() {
    if (state.historyIndex < state.history.length - 1) {
      state.historyIndex++;
      restoreHistoryState();
      showToast('Redo');
    }
  }

  function restoreHistoryState() {
    state.isRestoringHistory = true;
    deselectElement();
    elements.canvasPage.innerHTML = state.history[state.historyIndex] || '';
    decorateAllBlocks();
    updateElementCount();
    updateUndoRedoButtons();
    saveToLocalStorage();
    state.isRestoringHistory = false;
  }

  function updateUndoRedoButtons() {
    elements.btnUndo.disabled = state.historyIndex <= 0;
    elements.btnRedo.disabled = state.historyIndex >= state.history.length - 1;
  }

  function saveToLocalStorage() {
    try {
      localStorage.setItem('livewire_canvas_html', elements.canvasPage.innerHTML);
    } catch (err) {
      console.warn('Could not save to localStorage', err);
    }
  }

  function updateElementCount() {
    const count = elements.canvasPage.querySelectorAll('.wf-block').length;
    elements.canvasElementCount.textContent = `${count} element${count === 1 ? '' : 's'}`;
  }

  // ==========================================================================
  // Palette Filtering & Collapsing
  // ==========================================================================

  function setupPaletteCategoryCollapsing() {
    elements.paletteCategories.addEventListener('click', (e) => {
      const header = e.target.closest('.category-header');
      if (header) {
        const cat = header.closest('.palette-category');
        cat.classList.toggle('collapsed');
      }
    });
  }

  function filterPaletteItems(query) {
    const items = elements.paletteCategories.querySelectorAll('.palette-item');
    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      const match = text.includes(query);
      item.style.display = match ? 'flex' : 'none';
    });

    const categories = elements.paletteCategories.querySelectorAll('.palette-category');
    categories.forEach(cat => {
      const visible = cat.querySelectorAll('.palette-item[style*="display: flex"]').length > 0;
      cat.style.display = (query === '' || visible) ? 'block' : 'none';
    });
  }

  // ==========================================================================
  // Export & Share
  // ==========================================================================

  function exportStandaloneHtml() {
    elements.exportDropdown.classList.remove('open');
    const pageHtml = elements.canvasPage.innerHTML;

    const standalone = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LiveWire Interactive Prototype</title>
  <style>
    :root {
      --wf-page-bg: #f5f6f8;
      --wf-card-bg: #ffffff;
      --wf-text: #18181b;
      --wf-text-muted: #64748b;
      --wf-text-subtle: #94a3b8;
      --wf-border: #e2e8f0;
      --wf-border-strong: #cbd5e1;
      --wf-ph-bg: #e2e4e8;
      --wf-ph-border: #9ca3af;
      --wf-ph-text: #4b5563;
      --wf-dash-active: #27272a;
      --wf-dash-inactive-border: #9ca3af;
      --wf-dash-inactive-bg: #f1f5f9;
      --wf-btn-dark: #27272a;
      --wf-btn-dark-text: #ffffff;
      --wf-btn-light: #e5e7eb;
      --wf-btn-light-text: #1f2937;
      --wf-btn-light-border: #9ca3af;
      --wf-warn-bg: #fef08a;
      --wf-warn-border: #ca8a04;
      --wf-warn-text: #854d0e;
      --wf-font: system-ui, -apple-system, sans-serif;
      --wf-font-mono: ui-monospace, Menlo, Consolas, monospace;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: var(--wf-font); background: #16161b; color: var(--wf-text); padding: 40px 16px; min-height: 100vh; display: flex; justify-content: center; }
    .wireframe-page { width: 100%; max-width: 1000px; background: var(--wf-page-bg); box-shadow: 0 10px 40px rgba(0,0,0,0.4); border-radius: 4px; position: relative; }
    .wf-navbar { display: flex; align-items: center; justify-content: space-between; padding: 16px 28px; border-bottom: 1px solid var(--wf-border-strong); background: var(--wf-card-bg); }
    .wf-brand { font-size: 17px; font-weight: 700; }
    .wf-nav-links { display: flex; gap: 20px; font-size: 14px; font-weight: 500; }
    .wf-content-container { padding: 24px 32px; display: flex; flex-direction: column; gap: 20px; }
    .wf-breadcrumbs { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--wf-text-muted); }
    .wf-stepper-dashes { display: flex; gap: 8px; }
    .wf-dash { flex: 1; height: 8px; border-radius: 2px; cursor: pointer; }
    .wf-dash.active { background: var(--wf-dash-active); }
    .wf-dash.inactive { border: 1px solid var(--wf-dash-inactive-border); background: var(--wf-dash-inactive-bg); }
    .wf-page-title { font-size: 38px; font-weight: 800; line-height: 1.15; margin-bottom: 12px; }
    .wf-page-subtitle { font-size: 16px; color: var(--wf-text-muted); }
    .wf-feature-row { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; align-items: stretch; }
    .wf-feature-heading { font-size: 20px; font-weight: 700; margin-bottom: 10px; }
    .wf-feature-body { font-size: 14px; line-height: 1.6; color: var(--wf-text-muted); }
    .wf-image-placeholder { background: var(--wf-ph-bg); border: 2px dashed var(--wf-ph-border); border-radius: 2px; min-height: 220px; display: flex; align-items: center; justify-content: center; font-family: var(--wf-font-mono); font-size: 13px; color: var(--wf-ph-text); font-weight: 500; }
    .wf-callout { border-radius: 4px; padding: 14px 18px; display: flex; align-items: center; gap: 12px; font-size: 14px; }
    .wf-callout-warning { background: var(--wf-warn-bg); border: 1px solid var(--wf-warn-border); color: var(--wf-warn-text); }
    .wf-comparison-title { font-size: 20px; font-weight: 700; margin-bottom: 14px; }
    .wf-comparison-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .wf-comparison-caption { font-size: 13px; color: var(--wf-text-muted); text-align: center; margin-top: 8px; }
    .wf-pagination-nav { display: flex; justify-content: space-between; padding: 20px 0 10px 0; border-top: 1px solid var(--wf-border); }
    .wf-btn-back { background: var(--wf-btn-light); color: var(--wf-btn-light-text); border: 1px solid var(--wf-btn-light-border); padding: 10px 18px; border-radius: 5px; font-weight: 600; cursor: pointer; }
    .wf-btn-next { background: var(--wf-btn-dark); color: var(--wf-btn-dark-text); border: none; padding: 10px 20px; border-radius: 5px; font-weight: 600; cursor: pointer; }
    .wf-block-quick-bar, .wf-resize-handle, .wf-nav-add-link, .wf-stepper-controls, .wf-callout-type-switcher, .wf-placeholder-resize-handle { display: none !important; }
  </style>
</head>
<body>
  <div class="wireframe-page">
    ${pageHtml}
  </div>
  <script>
    document.querySelectorAll('.wf-dash').forEach(d => {
      d.addEventListener('click', () => {
        const row = d.parentElement;
        const all = Array.from(row.querySelectorAll('.wf-dash'));
        const idx = all.indexOf(d);
        all.forEach((item, i) => {
          item.className = i <= idx ? 'wf-dash active' : 'wf-dash inactive';
        });
      });
    });
  <\/script>
</body>
</html>`;

    downloadFile(standalone, 'wireframe-prototype.html', 'text/html');
    showToast('Exported standalone prototype HTML!');
  }

  function exportJson() {
    elements.exportDropdown.classList.remove('open');
    const data = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      theme: state.theme,
      layoutMode: state.layoutMode,
      html: elements.canvasPage.innerHTML
    };
    downloadFile(JSON.stringify(data, null, 2), 'livewire-layout.json', 'application/json');
    showToast('Saved wireframe JSON file!');
  }

  function importJson(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.html) {
          elements.canvasPage.innerHTML = data.html;
          decorateAllBlocks();
          if (data.theme) setTheme(data.theme);
          if (data.layoutMode) setLayoutMode(data.layoutMode, false);
          updateElementCount();
          pushHistory();
          saveToLocalStorage();
          showToast('Wireframe layout imported successfully!');
        }
      } catch (err) {
        alert('Invalid JSON file format: ' + err.message);
      }
    };
    reader.readAsText(file);
    elements.inputImportJson.value = '';
    elements.exportDropdown.classList.remove('open');
  }

  function downloadFile(content, fileName, contentType) {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  // ==========================================================================
  // Helper Utilities
  // ==========================================================================

  function showToast(msg) {
    elements.toast.textContent = msg;
    elements.toast.classList.add('show');
    clearTimeout(elements.toast._timer);
    elements.toast._timer = setTimeout(() => {
      elements.toast.classList.remove('show');
    }, 2800);
  }

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // Run initial setup when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
