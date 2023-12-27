import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { patternFormTranslations } from './components/Forms/PatternForm/PatternForm.i18n';
import { homePageTranslations } from './pages/HomePage/HomePage.i18n';
import { statisticsPageTranslations } from './pages/StatisticsPage/StatisticsPage.i18n';
import { accountSettingsPageTranslations } from './pages/AccountSettings/AccountSettingsPage.i18n';
import { bigCounterTranslations } from './components/BigCounter/BigCounter.i18n';
import { categoriesMenuTranslations } from './components/CategoriesMenu/CategoriesMenu.i18n';
import { counterGroupTranslations } from './components/CounterGroup/CounterGroup.i18n';
import { footerTranslations } from './components/Footer/Footer.i18n';
import { patternDetailsTranslations } from './pages/Patterns/PatternDetails.i18n';
import { unsavedPromptTranslations } from './components/UnsavedPrompt/UnsavedPrompt.i18n';
import { patternsTranslations } from './pages/Patterns/Patterns';
import { projectDetailsTranslations } from './pages/Projects/ProjectDetails.i18n';
import { projectsTranslations } from './pages/Projects/Projects';
import { pageNotFoundTranslations } from './pages/PageNotFound/PageNotFound.i18n';
import { counterMiniatureTranslations } from './components/CounterMiniature/CounterMiniature.i18n';
import { signUpPageTranslations } from './pages/SignUpPage/SignUpPage.i18n';
import { loginPageTranslations } from './pages/LoginPage/LoginPage.i18n';
import { resourcesTranslations } from './pages/Resources/Resources';
import { countersTranslations } from './pages/Counters/Counters';
import { sidebarAccountTranslations } from './components/SidebarAccount/SidebarAccount.i18n';
import { passwordValidationTranslations } from './components/PasswordVaildation/PasswordValidation.i18n';
import { navbarTranslations } from './components/Navbar/Navbar';
import { filtersBarTranslations } from './components/FiltersBar/FiltersBar';

const resources = {
  en: {
    HomePage: homePageTranslations.en,
    PatternForm: patternFormTranslations.en,
    StatisticsPage: statisticsPageTranslations.en,
    AccountSettingsPage: accountSettingsPageTranslations.en,
    BigCounter: bigCounterTranslations.en,
    CategoriesMenu: categoriesMenuTranslations.en,
    CounterGroup: counterGroupTranslations.en,
    Footer: footerTranslations.en,
    PatternDetails: patternDetailsTranslations.en,
    UnsavedPrompt: unsavedPromptTranslations.en,
    Patterns: patternsTranslations.en,
    ProjectDetails: projectDetailsTranslations.en,
    Projects: projectsTranslations.en,
    PageNotFound: pageNotFoundTranslations.en,
    CounterMiniature: counterMiniatureTranslations.en,
    SignUpPage: signUpPageTranslations.en,
    LoginPage: loginPageTranslations.en,
    Resources: resourcesTranslations.en,
    Counters: countersTranslations.en,
    SidebarAccount: sidebarAccountTranslations.en,
    PasswordValidation: passwordValidationTranslations.en,
    Navbar: navbarTranslations.en,
    FiltersBar: filtersBarTranslations.en,
  },
  pl: {
    HomePage: homePageTranslations.pl,
    PatternForm: patternFormTranslations.pl,
    StatisticsPage: statisticsPageTranslations.pl,
    AccountSettingsPage: accountSettingsPageTranslations.pl,
    BigCounter: bigCounterTranslations.pl,
    CategoriesMenu: categoriesMenuTranslations.pl,
    CounterGroup: counterGroupTranslations.pl,
    Footer: footerTranslations.pl,
    PatternDetails: patternDetailsTranslations.pl,
    UnsavedPrompt: unsavedPromptTranslations.pl,
    Patterns: patternsTranslations.pl,
    ProjectDetails: projectDetailsTranslations.pl,
    Projects: projectsTranslations.pl,
    PageNotFound: pageNotFoundTranslations.pl,
    CounterMiniature: counterMiniatureTranslations.pl,
    SignUpPage: signUpPageTranslations.pl,
    LoginPage: loginPageTranslations.pl,
    Resources: resourcesTranslations.pl,
    Counters: countersTranslations.pl,
    SidebarAccount: sidebarAccountTranslations.pl,
    PasswordValidation: passwordValidationTranslations.pl,
    Navbar: navbarTranslations.pl,
    FiltersBar: filtersBarTranslations.pl,
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'pl',
    lng: 'pl',
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;