namespace PitchFFT {

    let sampleRate = 8000

    /**
     * Get pitch in Hz from microphone
     */
    //% block
    export function getPitch(): number {
        let crossings = 0
        let last = input.soundLevel()

        let start = control.micros()
        let samples = 200

        for (let i = 0; i < samples; i++) {
            let current = input.soundLevel()
            if (last < 128 && current >= 128) {
                crossings++
            }
            last = current
            control.waitMicros(1000000 / sampleRate)
        }

        let duration = (control.micros() - start) / 1000000
        let frequency = (crossings / duration) / 2

        return frequency
    }
}
