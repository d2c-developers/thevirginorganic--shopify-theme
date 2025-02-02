import * as React from 'react';
import { createRoot } from 'react-dom/client';
import CartDrawer from '../components/CartDrawer';

const root = createRoot(document.getElementById('React-CartDrawer') as HTMLElement);
root.render(<CartDrawer />);
