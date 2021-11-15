import { Pointer } from '../Pointer';


export declare class AdvancedAudioPlayer {
    constructor(sampleRate: number, cachedPointCount: number, internalBufferSizeSeconds: number, negattiveSeconds: number, minimumTimestretchingPlaybackRate: number, maximumTimestretchingPlaybackRate: number, enableStems: boolean);

    /**
 * @description The output sample rate in Hz.
 */
    outputSamplerate: number;


    /**
     * @description Enable/disable time-stretching. Default: boolean.
     */
    timeStretching: boolean;


    /**
     * @description Amount of formant correction, between 0 (none) and 1 (full). Default: 0.
     */
    formantCorrection: boolean;


    /**
     * @description The original bpm of the current music. There is no auto-bpm detection inside, this must be set to a correct value for syncing. Maximum 300. A value below 20 will be automatically set to 0. Default: 0 (no bpm value known).
     */
    originalBPM: number;


    /**
     * @description If boolean and playbackRate is above 1.4f or below 0.6f, it will sync the tempo as half or double. Default: boolean.
     */
    fixDoubleOrHalfBPM: boolean;


    /**
     * @description Tells where the first beat is (the beatgrid starts). Must be set to a correct value for syncing. Default: 0.
     */
    firstBeatMs: number;


    /**
     * @description Sets the quantum for quantized synchronization. Example: 4 means 4 beats.
     */
    defaultQuantum: number;


    /**
     * @description A bpm value to sync with. Use 0.0f for no syncing.
     */
    syncToBpm: number;


    /**
     * @description The number of milliseconds elapsed since the last beat on audio the has to sync with. Use -1.0 to ignore.
     */
    syncToMsElapsedSinceLastBeat: number;


    /**
     * @description Used for quantized synchronization. The phase to sync with.
     */
    syncToPhase: number;


    /**
     * @description Used for quantized synchronization. The quantum to sync with.
     */
    syncToQuantum: number;


    /**
     * @description Pitch shift cents, from -2400 (two octaves down) to 2400 (two octaves up). Use values representing notes (multiply of 100), between -1200 and 1200 for low CPU load. Default: 0 (no pitch shift).
     */
    pitchShiftCents: number;


    /**
     * @description If boolean, jumps back and continues playback. If boolean, playback stops. Default: boolean.
     */
    loopOnEOF: boolean;


    /**
     * @description If this is boolean with playing backwards and looping, then reaching the beginning of the loop will change playback direction to forwards. Default: boolean.
     */
    reverseToForwardAtLoopStart: boolean;


    /**
     * @description The sound parameter of the internal TimeStretching instance.
     */
    timeStretchingSound: number;


    /**
     * @description The playback rate. Must be positive and above 0.00001. Default: 1.
     */
    playbackRate: number;


    /**
     * @description The maximum playback rate or scratching speed: 20.
     */
    static MaxPlaybackRate: number;

    openMemory(pointer: Pointer, skipSilenceAtBeginning: boolean, measureSilenceAtEnd: boolean): void;
    openPCM16AudioInMemory(pointer: Pointer, sampleRate: number, durationFrames: number, skipSilenceAtBeginning: boolean, measureSilenceAtEnd: boolean): void;

    getLatestEvent(): PlayerEvent;
    getOpenErrorCode(): any;

    static PlayerEvent_None: PlayerEvent;
    static PlayerEvent_Opening: PlayerEvent;
    static PlayerEvent_OpenFailed: PlayerEvent;
    static PlayerEvent_Opened: PlayerEvent;

    static statusCodeToString(ec: any): any;

    syncMode: SyncMode;

    static SyncMode_None: SyncMode;
    static SyncMode_Tempo: SyncMode;
    static SyncMode_TempoAndBeat: SyncMode;

    isWaitingForBuffering(): boolean;
    getAudioStartMs(): number;
    getAudioEndMs(): number;
    getPositionMs(): number;
    getDisplayPositionMs(): number;
    getDisplayPositionPercent(): number;
    getDisplayPositionSeconds(): number;
    getDurationMs(): number;
    getDurationSeconds(): number;
    play(): void;

    /**
     * Starts beat or tempo synchronized playback.
     *
     * @memberof AdvancedAudioPlayer
     */
    playSynchronized(): void;


    /**
     * Starts playback at a specific position. isPlaying() will return false and the position will not be updated until this function succeeds starting playback at the specified position.
     * You can call this in a real-time thread (audio processing callback) with a continuously updated time for a precise on-the-fly launch.
     *
     * @param {number} position Start position in milliseconds.
     * @memberof AdvancedAudioPlayer
     */
    playSynchronizedToPosition(position: number): void;


    /**
     * Pause playback. There is no need for a "stop" method, this player is very efficient with the battery and has no significant "stand-by" processing.
     *
     * @param {number} momentum Momentum in seconds. 0 means to pause immediately.
     * @param {number} slipTime Enable slip mode for a specific amount of time, or 0 to not slip.
     * @memberof AdvancedAudioPlayer
     */
    pause(momentum: number, slipTime: number): void;

    togglePlayback(): void;
    isPlaying(): boolean;

    /**
     * Simple seeking to a percentage
     *
     * @param {number} position The position in percentage.
     * @memberof AdvancedAudioPlayer
     */
    seek(position: number): void;

    setPosition(ms: number, andStop: boolean, synchronisedStart: boolean, forceDefaultQuantum: boolean, preferWaitingforSynchronisedStart: boolean): void;
    cachePosition(ms: number, pointId: number): void;
    processStereo(outputPointer: Pointer, mix: boolean, numberOfFrames: number, volume: number): boolean;
    process8Channels(outputPointer0: Pointer, outputPointer1: Pointer, outputPointer2: Pointer, outputPointer3: Pointer, mix: boolean, numberOfFrames: number, volume0: number, volume1: number, volume2: number, volume3: boolean): boolean;
    isStems(): boolean;
    //processSTEMSMaster(input, output, 128, 1)
    getCurrentBpm(): number;
    getMsElapsedSinceLastBeat(): number;
    getBeatIndex(): number;
    getPhase(): number;
    getQuantum(): number;
    getMsDifference(phase: number, quantum: number): number;
    getMsRemainingToSyncEvent(): number;
    // / Loop from a start point to some length.
    // player.loop(
    //     0,     // Loop from this milliseconds.
    //     1100,  // Loop length in milliseconds.
    //     true,  // If the playhead is within the loop, jump to the start or not.
    //     1,     // Position identifier. Looping caches startMs, therefore you can specify an identifier (or set to 255 if you don't care).
    //     true,  // Beat-synced start (true) or immediate (false).
    //     0,     // Number of times to loop. 0 means: until exitLoop() is called.
    //     false, // If true and using quantized synchronization, will use the defaultQuantum instead of the syncToQuantum.
    //     false  // Wait (true) or start immediately (false) when synchronized.
    // );

    // // Loop between a start and end points.
    // player.loopBetween(
    //     0,     // Loop from this milliseconds.
    //     4000,  // Loop to this milliseconds.
    //     true,  // If the playhead is within the loop, jump to the start or not.
    //     1,     // Position identifier. Looping caches startMs, therefore you can specify an identifier (or set to 255 if you don't care).
    //     true,  // Beat-synced start (true) or immediate (false).
    //     0,     // Number of times to loop. 0 means: until exitLoop() is called.
    //     false, // If true and using quantized synchronization, will use the defaultQuantum instead of the syncToQuantum.
    //     false  // Wait (true) or start immediately (false) when synchronized.
    // );

    // // Exit from the current loop.
    // player.exitLoop(
    //     false // If true, synchronized start or re-synchronization after the loop exit.
    // );

    // // Indicates if looping is enabled.
    // let looping = player.isLooping();

    // // Returns true if a position is inside the current loop.
    // let inside = player.msInLoop(
    //     150 // The position in milliseconds.
    // );

    // // Returns with the position of the closest beat.
    // let ms = player.closestBeatMs(
    //     6002, // The position in milliseconds where to find the closest beat.
    //     0     // Set to 1-4 to retrieve the position of a specific beat index relative to ms, or 0 for any beat index.
    // );

    // // Returns with the beat index of the closest beat.
    // let bi = player.closestBeatIndex(
    //     50 // The position in milliseconds where to find the closest beat.
    // );

    // // Sets playback direction.
    // player.setReverse(
    //     false, // True: reverse. False: forward.
    //     0      // Enable slip mode for a specific amount of time, or 0 to not slip.
    // );

    // // If true, the player is playing backwards.
    // let rev = player.isReverse();

    // // Starts on changes pitch bend (temporary playback rate change).
    // player.pitchBend(
    //     0.1,   // The maximum playback rate range for pitch bend, should be between 0.01 and 0.3 (1% and 30%).
    //     false, // Use time-stretching for pitch bend or not (false makes it "audible").
    //     true,  // True: faster, false: slower.
    //     500    // How long to maintain the pitch bend state in milliseconds. A value >= 1000 will hold until endContinuousPitchBend is called.
    // );

    // // Ends pitch bend.
    // player.endContinuousPitchBend();

    // // Returns with the distance (in milliseconds) to the beatgrid while using pitch bend for correction.
    // let ms = player.getBendOffsetMs();

    // // Reset the pitch bend offset to the beatgrid to zero.
    // player.resetBendMsOffset();

    // // Indicates if returning from scratching or reverse playback will maintain the playback position as if the player had never entered into scratching or reverse playback.
    // let slip = player.isPerformingSlip();

    // // "Virtual jog wheel" or "virtual turntable" handling.
    // player.jogTouchBegin(
    //     300, // Sets the sensitivity of the virtual wheel. Use around 2300 for pixel-perfect touchscreen waveform control.
    //     Superpowered.AdvancedAudioPlayer.Jogmode_Scratch, // Jog wheel mode (scratching, pitch bend, or parameter set in the 0-1 range).
    //     1000, // Enables slip mode for a specific amount of time for scratching, or 0 to not slip.
    // );

    // // A jog wheel should send some "ticks" with the movement. A waveform's movement in pixels for example.
    // player.jogTick(
    //     600,   // The ticks value.
    //     true,  // Use time-stretching for pitch bend or not (false makes it "audible").
    //     0.1,   // The maximum playback rate change for pitch bend, should be between 0.01f and 0.3f (1% and 30%).
    //     20,    // How long to maintain the pitch bend state in milliseconds. A value >= 1000 will hold until endContinuousPitchBend is called.
    //     false, // True: if there was no jogTouchBegin, turn to JogMode_Parameter mode. False: if there was no jogTouchBegin, turn to JogMode_PitchBend mode.
    // );

    // // Call this when the jog touch ends.
    // player.jogTouchEnd(
    //     0,   // The decelerating rate for momentum. Set to 0 for automatic.
    //     true // Beat-synced start after decelerating.
    // );

    // // Direct turntable handling. Call this when scratching starts. This is an advanced method, use it only if not using the jogT... methods.
    // player.startScratch(
    //     0,   // Enable slip mode for a specific amount of time for scratching, or 0 to not slip.
    //     true // Stop playback or not.
    // );

    // // Scratch movement. This is an advanced method, use it only if not using the jogT... methods.
    // player.scratch(
    //     1.1, // The current speed (pitch).
    //     0.5  // Smoothing factor. Should be between 0.05 (max. smoothing) and 1.0 (no smoothing).
    // );

    // // Ends scratching. This is an advanced method, use it only if not using the jogT... methods.
    // player.endScratch(
    //     true // Return to the previous playback state (direction, speed) or not.
    // );

    // // Indicates if the player is in scratching mode.
    // let scratching = player.isScratching();

    // // If jog wheel mode is JogMode_Parameter, returns with the current parameter typically in the range of -1 to 1, or less than -1000000.0 if there was no jog wheel movement. processStereo or processMulti updates this value, therefore it's recommended to read it after those calls were made, in the same thread.
    // let p = player.getJogParameter();

    // // Jog Wheel Mode, to be used with the jogT... methods.
    // Superpowered.AdvancedAudioPlayer.Jogmode_Scratch;   // Jog wheel controls scratching.
    // Superpowered.AdvancedAudioPlayer.Jogmode_PitchBend; // Jog wheel controls pitch bend.
    // Superpowered.AdvancedAudioPlayer.Jogmode_Parameter; // Jog wheel changes a parameter.

    destruct(): void;

}

declare enum SyncMode {
    None,
    Tempo,
    TempoAndBeat,
}

type PlayerEvent = any & { _: never; };
