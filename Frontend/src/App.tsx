import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage"
import Root from "./pages/Root";
import Account, { loader as dataLoader } from "./pages/Account/Account";
import Projects from "./pages/Projects/Projects";
import NewProjectPage from "./pages/Projects/NewProjectPage";
import Patterns from "./pages/Patterns/Patterns";
import PatternsRoot from "./pages/Patterns/PatternsRoot";
import LoginPage, {action as loginAction} from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import ProjectDetails, { loader as projectDetailsLoader } from "./pages/Projects/ProjectDetails";
import PatternDetails, { loader as patternDetailsLoader } from "./pages/Patterns/PatternDetails";
import AccountRoot from "./pages/Account/AccountRoot";
import NewPatternPage from "./pages/Patterns/NewPatternPage";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import ProjectsRoot from "./pages/Projects/ProjectsRoot";
import CountersRoot from "./pages/Counters/CountersRoot";
import Counters from "./pages/Counters/Counters";
import NewCounter from "./pages/Counters/NewCounter";
import EditProject from "./pages/Projects/EditProject";
import RecoverPassPage from "./pages/RecoverPassPage/RecoverPassPage";
import CounterDetails, { loader as counterDetailsLoader } from "./pages/Counters/CounterDetails";
import EditCounter from "./pages/Counters/EditCounter";
import Resources from "./pages/Resources/Resources";
import ResourcesRoot from "./pages/Resources/ResourcesRoot";
import NewResourcePage from "./pages/Resources/NewResourcePage";
import ResourceDetails, { loader as resourceDetailsLoader } from "./pages/Resources/ResourceDetails";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import AccountSettingsPage from "./pages/AccountSettings/AccountSettingsPage";
import ReportProblemPage from "./pages/ReportProblemPage/ReportProblemPage";
import StatisticsPage from "./pages/StatisticsPage/StatisticsPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import ChangePasswordPage from "./pages/AccountSettings/ChangePasswordPage";
import DeleteAccountPage from "./pages/AccountSettings/DeleteAccountPage";
import EditPattern from "./pages/Patterns/EditPattern";
import CommunityPatterns from "./pages/CommunityPatterns/CommunityPatterns";

const router = createBrowserRouter([
  {
    path: "/fiber-friend",
    element: <Root />,
    id: "root",        
    //errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,    
      },
      {
        path: "login",
        element: <LoginPage />,
        action: loginAction,
      },
      {
        path: "signUp",
        element: <SignUpPage />
      },
      {
        path: "recover-password",
        element: <RecoverPassPage />
      },
      {
        path: "account",
        loader: dataLoader,
        id: "account",
        element: <AccountRoot />,
        children: [
          {
            index: true,
            element: <Account />,
          },
          {
            path: "projects",
            id: "projects",
            element: <ProjectsRoot />,
            children: [
              {
                index: true,
                element: <Projects />,
          },
              {
                path: ":projectId",
                id: "project-details",
                loader: projectDetailsLoader,
                children: [
                  {
                    index: true,
                    element: <ProjectDetails />,
                  },
                  {
                    path: "edit",
                    element: <EditProject />,
                    //action: manipulateEventAction,
                    //loader: checkAuthLoader,
                  },

                ],
              },
              {
                path: "new-project",
                element: <NewProjectPage />,
                //action: manipulateProjectAction,
                //loader: checkAuthLoader,
              },
            ]
          },
          {
            path: "patterns",
            element: <PatternsRoot />,
            id: "patterns",
            children: [
              {
                index: true,
                element: <Patterns />,

              },
              {
                path: ":patternId",
                id: "pattern-details",
                loader: patternDetailsLoader,
                children: [
                  {
                    index: true,
                    element: <PatternDetails />,
                  },
                  {
                    path: "edit",
                    element: <EditPattern />,
                    //action: manipulateEventAction,
                    //loader: checkAuthLoader,
                  },

                ],
              },
              {
                path: "new-pattern",
                element: <NewPatternPage />
              }
            ]
          },
          {
            path: "counters",
            element: <CountersRoot />,
            id: "counters",
            children: [
              {
                index: true,
                element: <Counters />,
              },
              {
                path: "new-counter",
                element: <NewCounter />,
                //action: manipulateProjectAction,
                //loader: checkAuthLoader,
              },
              {
                path: ":counterId",
                id: "counter-details",
                loader: counterDetailsLoader,
                children: [
                  {
                    index: true,
                    element: <CounterDetails />,
                    //action: deleteEventAction,
                  },
                  {
                    path: "edit",
                    element: <EditCounter />,
                    //action: manipulateEventAction,
                    //loader: checkAuthLoader,
                  },

                ],
              },
            ]
          },
          {
            path: "resources",
            id: "resources",
            element: <ResourcesRoot />,
            children: [
              {
                index: true,
                element: <Resources />,
              },
              {
                path: ":resourceId",
                id: "resource-details",
                loader: resourceDetailsLoader,
                children: [
                  {
                    index: true,
                    element: <ResourceDetails />,
                  },
                  {
                    path: "edit",
                    element: <EditProject />,
                    //action: manipulateEventAction,
                    //loader: checkAuthLoader,
                  },

                ],
              },
              {
                path: "new-resource",
                element: <NewResourcePage />,
                //action: manipulateProjectAction,
                //loader: checkAuthLoader,
              },
            ]
          },
          {
            path: "settings",
            children: [
              {
                index: true,
                element: <AccountSettingsPage />,
              },
              {
                path: "change-password",
                element: <ChangePasswordPage />,
              },
              {
                path: "delete-account",
                element: <DeleteAccountPage />,
              },
            ]
          },
          {
            path: "statistics",
            id: "statistics",
            //loader: statisticsLoader,
            element: <StatisticsPage />,
          },
        ]
      },
      {
        path: "report-problem",
        element: <ReportProblemPage />
      },
      {
        path: "community-patterns",
        element: <CommunityPatterns />
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />
  },
]);


function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </div>
  );
}

export default App;
