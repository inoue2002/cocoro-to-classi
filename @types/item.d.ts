import { Timestamp } from '@google-cloud/firestore';
import { LineUser } from './lineUser';

export interface Item {
  // アイテムの識別ID
  id: string;
  // 初期化された日付
  init_at?: Timestamp;
  // 設定された日付
  register_at: Timestamp;
  // アイテムの名前
  name: string;
  // アイテムの画像URL
  imageUrl: string;
  // アイテムのメモ
  message: string;
  authorUser: LineUser;
}
