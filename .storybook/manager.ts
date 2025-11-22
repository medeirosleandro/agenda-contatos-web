import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

// Configuração do tema do Storybook
const theme = create({
  base: 'light',
  
  // Branding
  brandTitle: 'Agenda de Contatos',
  brandUrl: 'https://github.com/medeirosleandro/agenda-contatos-web',
  brandTarget: '_blank',
  
  // Colors
  colorPrimary: 'rgba(11, 73, 135, 1.00)',
  colorSecondary: 'rgba(19, 171, 245, 1.00)',
  
  // UI
  appBg: 'rgba(255, 255, 255, 1.00)',
  appContentBg: 'rgba(255, 255, 255, 1.00)',
  appBorderColor: 'rgba(232, 233, 236, 1.00)',
  appBorderRadius: 10,
  
  // Typography
  fontBase: '"Source Sans Pro", sans-serif',
  fontCode: 'monospace',
  
  // Text colors
  textColor: 'rgba(54, 63, 73, 1.00)',
  textInverseColor: 'rgba(255, 255, 255, 1.00)',
  
  // Toolbar
  barTextColor: 'rgba(142, 147, 153, 1.00)',
  barSelectedColor: 'rgba(19, 171, 245, 1.00)',
  barBg: 'rgba(255, 255, 255, 1.00)',
  
  // Form colors
  inputBg: 'rgba(255, 255, 255, 1.00)',
  inputBorder: 'rgba(232, 233, 236, 1.00)',
  inputTextColor: 'rgba(54, 63, 73, 1.00)',
  inputBorderRadius: 8,
});

addons.setConfig({
  theme,
});