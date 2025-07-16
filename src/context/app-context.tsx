import { createContext, createEffect, JSXElement, useContext } from 'solid-js';
import { SetStoreFunction } from 'solid-js/store';
import { DEFAULT_DIFFICULTY, DEFAULT_THEME } from '../lib/config';
import { createPersistentStore } from '../lib/create-persistent-store';
import { Difficulty, Rgb, RoundData, RoundStatus, Theme } from '../types';
import { generateRoundData } from '../utils';

type AppState = {
  roundStatus: RoundStatus;
  roundData: RoundData;
  difficulty: Difficulty;
  score: number;
  topScore: number;
  isNewTopScore: boolean;
  theme: Theme;
  isModalOpen: boolean;
};

type AppContext = {
  appState: AppState;
  setAppState: SetStoreFunction<AppState>;
  colorsOnBoard: () => Rgb[];
  winningColorIndex: () => number;
  winningColor: () => Rgb;
  isPlaying: () => boolean;
  isWin: () => boolean;
  isLose: () => boolean;
  startRound: () => void;
};

type Props = {
  children: JSXElement;
};

const initialAppState: AppState = {
  roundStatus: RoundStatus.Playing,
  roundData: generateRoundData(),
  difficulty: DEFAULT_DIFFICULTY,
  score: 0,
  topScore: 0,
  isNewTopScore: false,
  theme: DEFAULT_THEME,
  isModalOpen: false,
};

const AppContext = createContext<AppContext>({
  appState: initialAppState,
  setAppState: () => {},
  colorsOnBoard: () => [],
  winningColorIndex: () => -1,
  winningColor: () => ({ r: 0, g: 0, b: 0 }),
  isPlaying: () => true,
  isWin: () => false,
  isLose: () => false,
  startRound: () => {},
});

export function AppProvider(props: Props) {
  const [appState, setAppState] = createPersistentStore<AppState>('app-state', initialAppState, [
    'roundData',
    'roundStatus',
    'difficulty',
    'score',
    'topScore',
    'theme',
  ]);

  const colorsOnBoard = () => appState.roundData[appState.difficulty].colors;
  const winningColorIndex = () => appState.roundData[appState.difficulty].winningColorIndex;
  const winningColor = () => colorsOnBoard()[winningColorIndex()];
  const isPlaying = () => appState.roundStatus === RoundStatus.Playing;
  const isWin = () => appState.roundStatus === RoundStatus.Win;
  const isLose = () => appState.roundStatus === RoundStatus.Lose;
  const startRound = () => {
    setAppState((prevState) => ({
      ...prevState,
      roundStatus: RoundStatus.Playing,
      roundData: generateRoundData(),
      isNewTopScore: false,
    }));
  };

  createEffect(() => {
    document.documentElement.setAttribute('data-theme', appState.theme);
  });

  return (
    <AppContext.Provider
      value={{
        appState: appState,
        setAppState: setAppState,
        colorsOnBoard,
        winningColorIndex,
        winningColor,
        isPlaying,
        isWin,
        isLose,
        startRound,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const value = useContext(AppContext);

  if (!value) {
    throw new Error(`Missing ${AppProvider.name} provider`);
  }

  return value;
}
