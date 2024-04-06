export default{
    randomColorName(){
        const colors = ['bg-green', 'bg-blue', 'bg-indigo', 'bg-pink', 'bg-purple', 'bg-teal'];
        return colors[Math.floor(Math.random() * colors.length)];
    },
    randomColor(){
        const colors = ['bg-green-500', 'bg-blue-500', 'bg-indigo-500', 'bg-pink-500', 'bg-purple-500', 'bg-teal-500'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
};