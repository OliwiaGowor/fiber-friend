import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage"
import Root from "./pages/Root";
import Account from "./pages/Account/Account";
import Projects from "./pages/Projects/Projects";
import NewProjectPage from "./pages/Projects/NewProjectPage";
import Patterns from "./pages/Patterns/Patterns";
import PatternsRoot from "./pages/Patterns/PatternsRoot";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import ProjectDetails, { loader as projectDetailsLoader } from "./pages/Projects/ProjectDetails";
import PatternDetails, { loader as patternDetailsLoader } from "./pages/Patterns/PatternDetails";
import AccountRoot, {loader as userDataLoader} from "./pages/Account/AccountRoot";
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
import CommunityPatternDetails, { loader as communityPatternDetailsLoader } from "./pages/CommunityPatterns/CommunityPatternDetails";
import CommunityPatternsRoot from "./pages/CommunityPatterns/CommunityPatternsRoot";
import {action as logoutAction} from "./utils/logout";

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
      },
      {
        path: "signUp",
        element: <SignUpPage />
      },
      {
        path: "logout",
        action: logoutAction,
      },
      {
        path: "recover-password",
        element: <RecoverPassPage />
      },
      {
        path: "account",
        id: "account",
        loader: userDataLoader,
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
                  },

                ],
              },
              {
                path: "new-project",
                element: <NewProjectPage />,
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
              },
              {
                path: ":counterId",
                id: "counter-details",
                loader: counterDetailsLoader,
                children: [
                  {
                    index: true,
                    element: <CounterDetails />,
                  },
                  {
                    path: "edit",
                    element: <EditCounter />,
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
                  },

                ],
              },
              {
                path: "new-resource",
                element: <NewResourcePage />,
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
        element: <CommunityPatternsRoot />,
        children: [
          {
            index: true,
            element: <CommunityPatterns />,
          },
          {
            path: ":communityPatternId",
            id: "community-pattern-details",
            loader: communityPatternDetailsLoader,
            children: [
              {
                index: true,
                element: <CommunityPatternDetails />,
              },
            ],
          },
        ]
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
