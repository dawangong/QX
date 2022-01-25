import { Text } from 'react-native';

const Home = () => <Text>Home</Text>;

const About = () => <Text>About</Text>;

export interface Props {
  path: string;
  auth?: boolean;
  exact?: boolean;
  strict?: boolean;
  title?: string;
  params?: any;
  isHide?: boolean;
  Component?: React.ReactNode;
  isCheckRole?: boolean;
}

const config: Array<Props> = [
  {
    path: "/",
    exact: true,
    strict: false,
    Component: Home,
    title: "111",
  },
  {
    path: "/About",
    exact: true,
    strict: false,
    Component: About,
    title: "222",
  },
];

export default config;
