import type { DiaryIsland, DiaryLesson } from '../types'
import { communicationIsland, communicationIslandLessons, communicationIslandName } from './communicationIsland'
import { emotionIsland, emotionIslandLessons, emotionIslandName } from './emotionIsland'
import { friendshipIsland, friendshipIslandLessons, friendshipIslandName } from './friendshipIsland'
import { independenceIsland, independenceIslandLessons, independenceIslandName } from './independenceIsland'
import { situationsIsland, situationsIslandLessons, situationsIslandName } from './situationsIsland'

export const ISLANDS: DiaryIsland[] = [
  emotionIsland,
  communicationIsland,
  independenceIsland,
  friendshipIsland,
  situationsIsland,
]

export const ISLAND_LESSONS: Record<string, DiaryLesson[]> = {
  [emotionIslandName]: emotionIslandLessons,
  [communicationIslandName]: communicationIslandLessons,
  [independenceIslandName]: independenceIslandLessons,
  [friendshipIslandName]: friendshipIslandLessons,
  [situationsIslandName]: situationsIslandLessons,
}
