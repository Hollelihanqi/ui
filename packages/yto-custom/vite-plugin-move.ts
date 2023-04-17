export default function movePlugin(afterBuildCall = () => { }) {
    return {
        name: 'move-file',
        closeBundle() {
            afterBuildCall()
        }
    }
}