export type CueStatus = 'draft' | 'ready' | 'confirmed';
export type UserRole = 'designer' | 'programmer' | 'stage-manager' | 'readonly';
export type ConflictSeverity = 'error' | 'warning';

export interface Cue {
  id: string;
  number: string;
  label: string;
  position: string;
  channel: string;
  color: string;
  colorHex: string;
  brightness: number;
  fadeIn: number;
  hold: number;
  fadeOut: number;
  followCueId: string;
  targetNote: string;
  notes: string;
  status: CueStatus;
  startTime?: number;
  duration?: number;
  endTime?: number;
}

export interface Scene {
  id: string;
  name: string;
  order: number;
  frozen: boolean;
  startTime?: number;
  duration?: number;
  cues: Cue[];
}

/**
 * 配方内保存的提示快照。不含 id / 时间字段：
 * id 在套用时重新生成，因此后续提示与配方互不影响；
 * followRef 只在同一配方内引用条目，套用顺序中位于其前的条目。
 */
export interface CueRecipeItem {
  ref: string;
  number: string;
  label: string;
  position: string;
  channel: string;
  color: string;
  colorHex: string;
  brightness: number;
  fadeIn: number;
  hold: number;
  fadeOut: number;
  followRef: string;
  targetNote: string;
  notes: string;
  status: CueStatus;
}

export interface CueRecipe {
  id: string;
  name: string;
  createdAt: string;
  /** 保存快照时来源场次的名称，仅用于说明，不参与套用逻辑。 */
  sourceSceneName: string;
  items: CueRecipeItem[];
}

export interface LightingPlan {
  id: string;
  name: string;
  description: string;
  updatedAt: string;
  scenes: Scene[];
  recipes: CueRecipe[];
}

export interface CueConflict {
  id: string;
  planId: string;
  cueId: string;
  sceneId: string;
  severity: ConflictSeverity;
  type: 'channel-overlap' | 'follow-order' | 'missing-data' | 'duplicate-position' | 'duration';
  message: string;
}

export interface Workspace {
  plans: LightingPlan[];
  activePlanId: string;
  comparePlanId: string;
  selectedSceneId: string;
  selectedCueId: string;
  role: UserRole;
}

export interface EditorState {
  workspace: Workspace;
  past: Workspace[];
  future: Workspace[];
  lastAction: string;
}

export interface PersistedState {
  workspace: Workspace;
}
