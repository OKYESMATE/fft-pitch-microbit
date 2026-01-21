namespace PitchDetector {

    let lastSample = 0
    let zeroCrossings = 0
    let sampleCount = 0

    // collect raw audio samples
    input.onSoundSample(function (sample: number) {
        // zero crossing detection
        if (lastSample < 0 && sample >= 0) {
            zeroCrossings++
        }
        lastSample = sample
        sampleCount++
    })

    /**
     * Get pitch in Hz (approx)
     */
    //% block
    export function getPitch(): number {
        zeroCrossings = 0
        sampleCount = 0

        // sample window (200 ms)
        basic.pause(200)

        // estimated sample rate ~11kHz
        let durationSeconds = 0.2
        let frequency = (zeroCrossings / durationSeconds) / 2

        // ignore silence & noise
        if (frequency < 50 || frequency > 2000) {
            return 0
        }

        return Math.round(frequency)
    }
}
