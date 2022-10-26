import { I18nextProvider, useTranslation } from "react-i18next";
import {i18Props} from '@/i18n' 

function App() {
  const { t, i18n } = useTranslation();
  const changeLanguageHandler = (lang:string) =>
  {
    i18n.changeLanguage(lang)
  }

  return (
    <I18nextProvider {...i18Props}>
    <div className="App">
      <h2>{t('look.deep')}</h2>
      <h2>{t('key')}</h2>
      <br/>
      <button onClick={()=>changeLanguageHandler("en")}>Change to EN</button>
      <button onClick={()=>changeLanguageHandler("he")}> Change to HE</button>
    </div>
    </I18nextProvider>

  );
}

export default App;
