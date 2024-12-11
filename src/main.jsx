import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ContextShare from './contextApi/ContextShare.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import UserAuthContext from './contextApi/UserAuthContext.jsx'
import AdminAuthContext from './contextApi/AdminAuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='171104893531-tcehgnvr3mb2cf2331hm27ug9hm6ck26.apps.googleusercontent.com'>
    <StrictMode>
          <AdminAuthContext>
            <UserAuthContext>
              <ContextShare>
                <BrowserRouter><App /></BrowserRouter>
              </ContextShare>
            </UserAuthContext>
          </AdminAuthContext>
    </StrictMode>
  </GoogleOAuthProvider>
)
