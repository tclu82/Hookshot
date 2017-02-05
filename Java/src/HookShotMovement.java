import java.math.*;

/**
 * Created by zac on 1/23/17.
 *
 * This class simulates our Hook Shot Hero movement when he shoot the hook shot
 */
public class HookShotMovement {

    // Fields

    /** The length of hook shot AKA radius */
    private double hookShotLength;
    /** The anchoring point */
    private Point centerPoint;
    /** The hero current point */
    private Point currentPoint;

    /**
     * Constructor
     */
    private HookShotMovement() {

        this.centerPoint = new Point(0, 0);

        currentPoint = new Point(-3, 4);

        double diffX = centerPoint.x - currentPoint.x;

        double diffY = centerPoint.y - currentPoint.y;

        this.hookShotLength = Math.sqrt((diffX * diffX) + (diffY * diffY));
    }
    /**
     * Get current X coordination
     *
     * @return double
     */
    public double getX() {
        return currentPoint.getX();
    }

    /**
     * Get current Y coordination
     *
     * @return double
     */
    public double getY() {
        return currentPoint.getY();
    }

    /**
     * Get current Point position
     *
     * @return Point
     */
    private Point getPoint() {
        return currentPoint;
    }

    /**
     * This method calculates all the (x, y) on the swing circular orbit.
     *
     * If the center (a, b), radius = r
     * All (x,y) on the circular orbit satisfy following equation: (x-a)^2 + (y-b)^2 = r^2
     *
     * @param xInterval
     */
    public void heroMoveWithoutTrigonometric(double xInterval) {
        // Determine how far we want to travel of x coordination (twice difference of center.x and current.x)
        double horizentalDistance = 2 * (centerPoint.x - currentPoint.x);
        // Update the x coordinate by input pixel
        for (double x=currentPoint.x; x<=currentPoint.x+horizentalDistance; x+=xInterval) {
            // Find out mapping y coordination
            double y = Math.sqrt(hookShotLength * hookShotLength
                            - centerPoint.x * centerPoint.x
                            + 2 * centerPoint.x * x - (x * x))
                            + centerPoint.y;

            String position = String.format("X: %.3f, Y: %.3f", x, y);

            System.out.println(position);
        }
    }

    /**
     * This method calculus how our hero move by degree
     *
     * Assume that top left is (-length, 0) which is a starting point, degree is 0,
     * and the center is set to (0,0).
     *
     * When the hero move to bottom which degree is -90 from starting point,
     * the coordination is (0, -length).
     *
     * When the hero move to top right, it's position is (length, 0)
     *
     * @param moveByDegree
     */
    public void heroMove(int moveByDegree) {

        // JS: console.log(Math.atan(1) * 180 / Math.PI);

        double diffX = centerPoint.x - currentPoint.x;

        double diffY = centerPoint.y - currentPoint.y;

        double startDegree = Math.toDegrees(Math.atan(diffX / diffY));


        for (double degree=startDegree; degree<=180-startDegree; degree+= moveByDegree) {

            /**
             * In JavaScript:
             *
             * currentPoint.x = -(Math.cos(degree / 180 * Math.PI) - 1) * hookShotLength;
             * currentPoint.y = Math.sin(degree / 180 * Math.PI) * hookShotLength;

                 // Converts from degrees to radians.
                 Math.radians = function(degrees) {
                    return degrees * Math.PI / 180;
                 };

                 x = Math.cos(Math.radians(theDegreeWeWantT));
                 y = Math.sin(Math.radians(theDegreeWeWantT));
             *
             */


            currentPoint.x = -(Math.cos(Math.toRadians(degree))-1) * hookShotLength;

            currentPoint.y = Math.sin(Math.toRadians(degree)) * hookShotLength;



            String position = String.format("Degree: %.3f, X: %.3f, Y: %.3f",
                    degree,
                    currentPoint.x,
                    currentPoint.y);

            System.out.println(position);
        }
    }

    /**
     * Main method
     *
     * @param theArgs
     */
    public static void main(String... theArgs) {
        System.out.println("============Program start==========");
        // Decide how long hero's hook shot is
        HookShotMovement hsm = new HookShotMovement();
//        // Change the integer degree 0~180, the smaller degree number, display more positions
//        hsm.heroMove(15);

//        double startDegree = Math.toDegrees(Math.atan(1));
//        System.out.println(startDegree);

        // X coordinate increase 0.1 -> prints out all Swing (x, y) from start point to end point
        hsm.heroMoveWithoutTrigonometric(0.1);
    }

    /**
     * Private Point class
     */
    private class Point {

        // Fields
        private double x;

        private double y;

        /**
         * Private constructor, HookShotMovement class use only
         *
         * @param x
         * @param y
         */
        private Point(double x, double y) {
            this.x = x;
            this.y = y;
        }

        /**
         * Get x coordination
         *
         * @return
         */
        public double getX() {
            return x;
        }

        /**
         * Get y coordination
         *
         * @return
         */
        public double getY() {
            return y;
        }

        /**
         * Get Point position
         *
         * @return
         */
        public Point getPoint() {
            return new Point(x, y);
        }
    }
}
