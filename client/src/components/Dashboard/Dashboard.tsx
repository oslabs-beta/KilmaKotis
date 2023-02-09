/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable import/order */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/react-in-jsx-scope */
import {
  AiOutlineCluster,
  AiOutlineControl,
  AiOutlinePlus,
  AiOutlineWarning,
} from 'react-icons/ai';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
  RiBarChartLine,
  RiBubbleChartLine,
  RiLogoutBoxLine,
  RiSettings3Line,
} from 'react-icons/ri';
import { RootState, persistor } from '../../../redux/store';
import { setIsLoggedIn, setUserData } from '../../../redux/Slices/UserSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/Hooks/Hooks';
import { useEffect, useState } from 'react';

import AddCluster from '../AddCluster/AddCluster';
import AlertsMetrics from '../Metrics/AlertsMetrics/AlertsMetrics';
import ClusterMetrics from '../Metrics/ClusterMetrics/ClusterMetrics';
import KubeView from '../Kubeview/KubeView';
// import LightOrDark from '../ModeSwitch/ModeSwitch';
import { MdAddCircleOutline } from 'react-icons/md';
import Profile from '../Profile/Profile';
import ScalingMetrics from '../Metrics/ScalingMetrics/ScalingMetrics';

function Dashboard() {
  const isLoggedIn = useAppSelector((state: RootState) => state.isLoggedIn);
  // const isLoggedIn = localStorage.getItem('loggedIn');
  const [active, setActive] = useState(1);
  // clicking on the different options on the sidebar changes the 'active' state above
  const listElement =
    'text-prussian-blue text-base hover:scale-105 hover:bg-teal-blue/20 ';
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  console.log('Dashboard is being rendered after sign in');
  const loggedOut = (event: any) => {
    event.preventDefault();
    dispatch(setIsLoggedIn(false));
    // localStorage.setItem('loggedIn', 'false');
    dispatch(
      setUserData({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
      })
    );
    persistor.purge();
  };

  useEffect(() => {
    if (isLoggedIn) navigate('/dashboard');
    else navigate('/');
  }, [isLoggedIn]);

  return (
    <div className="w-screen h-screen">
      <div className="flex">
        <div className="flex">
          <div
            id="dashboardbg"
            className="flex flex-col p-3 bg-honeydew shadow w-60 h-full"
          >
            <div className="space-y-3 fixed">
              <div className="flex items-center pt-6">
                <h2
                  id="dbText"
                  className="text-2xl text-prussian-blue pl-4 font-bold"
                >
                  Dashboard
                </h2>
              </div>
              <div className="flex">
                <ul className="pt-2 pb-4 space-y-3 text-sm">
                  <li className={listElement} onClick={() => setActive(1)}>
                    <a
                      href="#scalingmetrics"
                      className="flex items-center p-2 space-x-3 rounded-md"
                    >
                      <RiBarChartLine
                        size={24}
                        className="fill-prussian-blue"
                      />
                      <span id="scalingoption">Scaling Metrics</span>
                    </a>
                  </li>
                  {/* make alerts render on the screen on click: path='/alerts' */}
                  <li className={listElement} onClick={() => setActive(2)}>
                    <a
                      href="#alerts"
                      className="flex items-center p-2 space-x-3 rounded-md"
                    >
                      <AiOutlineWarning
                        size={24}
                        className="fill-prussian-blue"
                      />
                      <span id="alertsoption">Alerts</span>
                    </a>
                  </li>
                  <li className={listElement} onClick={() => setActive(3)}>
                    <a
                      href="#clusterinfo"
                      className="flex items-center p-2 space-x-3 rounded-md"
                    >
                      <AiOutlineCluster
                        size={24}
                        className="fill-prussian-blue"
                      />
                      <span id="clusteroption">Cluster Health</span>
                    </a>
                  </li>
                  <li className={listElement} onClick={() => setActive(4)}>
                    <a
                      href="#kubeview"
                      className="flex items-center p-2 space-x-3 rounded-md"
                    >
                      <RiBubbleChartLine
                        size={24}
                        className="fill-prussian-blue"
                      />
                      <span id="kubeoption">KubeView</span>
                    </a>
                  </li>
                  <li className={listElement}>
                    <a className="flex items-center p-2 space-x-3 rounded-md">
                      <MdAddCircleOutline
                        size={24}
                        className="fill-prussian-blue"
                      />
                      <span id="add-cluster">
                        <AddCluster />
                      </span>
                    </a>
                  </li>
                  <li className={listElement}>
                    <a className="flex items-center p-2 space-x-3 rounded-md">
                      <RiSettings3Line
                        size={24}
                        className="fill-prussian-blue"
                      />
                      <span id="settingsoption">
                        <Profile />
                      </span>
                    </a>
                  </li>
                  <li className={listElement} onClick={loggedOut}>
                    <Link
                      to="/"
                      className="flex items-center p-2 space-x-3 rounded-md mb-24"
                    >
                      <RiLogoutBoxLine
                        size={24}
                        className="fill-prussian-blue"
                      />
                      <div>
                        <span id="logout-option">Logout</span>
                      </div>
                    </Link>
                  </li>
                  <div className="flex py-4 px-6 rounded-full justify-start bg-primary-color shadow-md hover:shadow-lg cursor-pointer hover:scale-105 text-white">
                    <AiOutlinePlus className="justify-start mr-2 text-lg font-semibold hover:scale-105" />
                    <p className="">Create a Cluster</p>
                  </div>
                </ul>
              </div>
            </div>
          </div>
          <Outlet />
        </div>
        {active === 1 && <ScalingMetrics />}
        {active === 2 && <AlertsMetrics />}
        {active === 3 && <ClusterMetrics />}
        {active === 4 && <KubeView />}
        {active === 5 && <Profile />}
      </div>
    </div>
  );
}

export default Dashboard;
