import { useState } from 'react';
import Copy from './icons/Copy';
import Check from './icons/Check';
import emailjs from '@emailjs/browser';

const App = () => {
  const [buttonContent, setButtonContent] = useState('Enviar');
  const [buttonIcon, setButtonIcon] = useState('Copy');
  const [buttonWidth, setButtonWidth] = useState('auto');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    const emailValue = e.target.email_from.value;

    if (!emailValue.trim()) {
      setErrorMessage('No ha ingresado nada.');
      setShowPopup(true);
      setPopupMessage('Ingrese su nombre y apellido.');
      setPopupType('error');
      setTimeout(() => {
        setErrorMessage('');
        setShowPopup(false);
      }, 3000);
      return;
    }

    emailjs.sendForm('service_n9gca98', 'template_zhp20js', e.target, 'vHJTmMLQaFnRj43ci')
      .then(() => {
        setButtonIcon('Check');
        setButtonWidth('auto');
        e.target.email_from.value = '';
        
        setShowPopup(true);
        setPopupMessage('Email enviado con éxito');
        setPopupType('success');

        setTimeout(() => {
          setButtonIcon('Copy');
          setButtonContent('Enviar');
          setShowPopup(false);
        }, 3000);
      })
      .catch(error => {
        console.error('Error sending email:', error);
        setErrorMessage('Ocurrió un error al enviar el email.');
        setShowPopup(true);
        setPopupMessage('Ocurrió un error al enviar el email.');
        setPopupType('error');
      });
  }

  const handleCopy = (text, buttonId) => {
    const button = document.getElementById(buttonId);
    const originalText = button.innerHTML;

    navigator.clipboard.writeText(text).then(() => {
      button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M17.707 4.293a1 1 0 010 1.414l-10 10a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L7 13.086l9.293-9.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>Copiado';
      setTimeout(() => {
        button.innerHTML = originalText;
      }, 2000);
    }).catch(err => {
      console.error(`Error al copiar el texto: ${text}`, err);
    });
  };

  return (
    <main className="max-w-5xl mx-auto pb-7">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[#fff0f0] bg-[radial-gradient(#ebdfdf_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="flex flex-col items-center px-4">
        <h1 className="font-bold text-4xl text-center md:text-[3.5rem] tracking-tighter pt-10">
          ¡Gracias por <span className="tracking-tight inline from-[#fb9d21] to-[#ff7300] bg-clip-text text-transparent bg-gradient-to-b">confiar</span> en nosotros!
        </h1>
        <h3 className="text-base md:text-xl pt-8">Si querés pagar por otro medio, no dudes en contactarnos.</h3>

        <div className="md:pt-16 pt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#FEFEFE] flex flex-col py-5 items-center rounded-3xl border-2 border-white hover:border-[#ffb04991] duration-200 transition">
            <h2 className="text-2xl md:text-3xl font-bold pt-4">Datos de la cuenta</h2>
            <p className="text-lg">Banco de la prov. de Cba.</p>
            <div className="flex flex-col justify-center pt-10 gap-y-6">
              <p className="text-sm md:text-base"><span className="text-base md:text-lg font-semibold">Número de cuenta:</span> CC $ 441 0002720104</p>
              <p className="text-sm md:text-base"><span className="text-base md:text-lg font-semibold">Titular:</span> Jorge/Franco/Diego Novara</p>
              <p className="text-sm md:text-base"><span className="text-base md:text-lg font-semibold">CUIT:</span> 20-34669336-4</p>
              <p className="text-sm md:text-base"><span className="text-base md:text-lg font-semibold">Alias:</span> ESTUDIONOVARA</p>
              <p className="text-sm md:text-base"><span className="text-base md:text-lg font-semibold">CBU:</span> 0200441301000002720147</p>
            </div>
            <div className="flex gap-4">
              <button 
                id="copyAliasBtn" 
                className="flex items-center gap-x-2 font-medium bg-[#fce7e7] hover:bg-[#fce0e0] px-4 py-2 rounded-xl mt-4 md:mt-12 md:text-base text-sm" 
                onClick={() => handleCopy('ESTUDIONOVARA', 'copyAliasBtn')}
              >
                <Copy />
                Copiar Alias
              </button>
              <button 
                id="copyCBUBtn" 
                className="flex items-center gap-x-2 font-medium bg-[#fce7e7] hover:bg-[#fce0e0] px-4 py-2 rounded-xl mt-4 md:mt-12 md:text-base text-sm" 
                onClick={() => handleCopy('0200441301000002720147', 'copyCBUBtn')}
              >
                <Copy />
                Copiar CBU
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-[#FEFEFE] rounded-3xl border-2 border-white hover:border-[#ffb04991] duration-200 transition flex flex-col p-4 md:p-6 space-y-4 md:space-y-6">
              <div className="flex flex-col md:flex-col items-center pt-3 justify-between">
                <img src="/mercado-pago-black.svg" className="pb-4 select-none" draggable="false" width="250" alt="" />
              </div>

              <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col justify-start gap-y-6">
                  <p className="text-sm md:text-base"><span className="text-base md:text-lg font-semibold">Titular:</span> Franco Novara</p>
                  <p className="text-sm md:text-base"><span className="text-base md:text-lg font-semibold">Alias:</span> estudionovara.mp</p>
                  <p className="text-sm md:text-base"><span className="text-base md:text-lg font-semibold">CVU:</span> 0000003100008744584112</p>
                </div>
                <div className="flex gap-4 mt-9">
                  <button 
                    id="copyAliasMercadoPagoBtn" 
                    className="flex items-center gap-x-2 font-medium bg-[#fce7e7] hover:bg-[#fce0e0] px-4 py-2 rounded-xl md:mt-4 mt-2 md:text-base text-sm" 
                    onClick={() => handleCopy('estudionovara.mp', 'copyAliasMercadoPagoBtn')}
                  >
                    <Copy />
                    Copiar Alias
                  </button>
                  <button 
                    id="copyCVUBtn" 
                    className="flex items-center gap-x-2 font-medium bg-[#fce7e7] hover:bg-[#fce0e0] px-4 py-2 rounded-xl md:mt-4 mt-2 md:text-base text-sm" 
                    onClick={() => handleCopy('0000003100008744584112', 'copyCVUBtn')}
                  >
                    <Copy />
                    Copiar CVU
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <a href="https://api.whatsapp.com/send?phone=5493564651485" target="_blank" rel="noopener" className="bg-[#00E676] border-2 border-[#00E676] hover:border-[#fff] duration-200 transition cursor-pointer flex items-center justify-center gap-x-4 rounded-3xl px-10 py-4">
                <img src="/whatsapp.svg" className="" width="50" alt="" />
                <p className="text-xl font-semibold text-white">Whatsapp</p>
              </a>
              <a href="mailto:administracion@estudionovara.com" target="_blank" rel="noopener" className="bg-[#FEFEFE] border-2 border-white hover:border-[#ffb04991] duration-200 transition cursor-pointer flex items-center justify-center gap-x-4 rounded-3xl px-10 py-4">
                <img src="/gmail.svg" width="50" alt="" />
                <p className="text-xl font-semibold ">Gmail</p>
              </a>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 bg-[#FEFEFE] border-2 border-white hover:border-[#ffb04991] duration-200 transition rounded-3xl p-1 flex flex-col gap-y-3 md:flex-row justify-between items-center">
            <h3 className="text-lg px-4 md:text-xl font-bold">Informar transferencia</h3>
              <form className='grid grid-cols-10 items-center bg-[#FEFEFE] rounded-[16px] p-2 z-20' onSubmit={sendEmail}>
                <div className="col-span-8">
                  <input type="text" name='email_from' placeholder="Nombre y apellido" className="rounded-full px-4 border-none font-medium focus:outline-none bg-[#fffbfb] placeholder:text-[#3f3f3f] text-[#3f3f3f] placeholder:md:text-base placeholder:text-sm placeholder:bg-[#fffbfb]" />
                </div>
                <div className="col-span-2">
                  <button 
                    className={`flex items-center gap-x-2 bg-[#fb9d21] hover:bg-[#feb14b] duration-500 font-semibold text-white rounded-[12px] py-2 px-4 text-sm md:text-base w-${buttonWidth}`} 
                    style={{ width: buttonWidth }}
                  >
                    {buttonIcon === 'Check' ? <Check /> : buttonContent}
                  </button>
                  
                </div>
              </form>
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed bottom-4 right-4 z-50 bg-[#FEFEFE] text-black rounded-2xl">
          <div className={`bg-${popupType === 'error' ? 'red' : 'green'}-500 p-4 md:p-6 rounded-2xl shadow-lg flex items-center`}>
            {popupType === 'error' ? (
              <svg  xmlns="http://www.w3.org/2000/svg" style={{ width: '24px', height: '24px',color: '#fff',marginRight: '0.6rem',backgroundColor: '#F97316',borderRadius: '50%' }} className="h-6 w-6 text-orange-500 mr-4"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-alert-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
            <p className="md:text-base text-xs font-semibold text-black">{popupMessage}</p>
          </div>
        </div>
      )}
      
    </main>
  );
};

export default App;
