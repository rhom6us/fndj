import FastPriorityQueue from 'fastpriorityqueue';
import { FnEvent } from './FnEvent';

const q = new FastPriorityQueue<FnEvent>((a, b) => a.compareTo(b));
