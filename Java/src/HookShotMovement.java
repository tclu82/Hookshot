import java.math.*;

/**
 * Created by zac on 1/23/17.
 *
 * This class simulates our Hook Shot Hero movement when he shoot the hook shot
 */
public class HookShotMovement {

    // Fields
    private double hookShotLength;

    private Point centerPoint;

    private Point currentPoint;

    /**
     * Constructor
     *
     * @param hookShotLength
     */
    private HookShotMovement(double hookShotLength) {

        this.hookShotLength = hookShotLength;

        this.centerPoint = new Point(0, 0);

        currentPoint = new Point(hookShotLength * -1, 0);
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

        for (int degree=0; degree<=180; degree+= moveByDegree) {

            /**
             * In Java, Math.cos(Math.toRadians(degree)) can be writte Math.sin(30 / 180 * Math.PI) in JavaScript or

                 // Converts from degrees to radians.
                 Math.radians = function(degrees) {
                    return degrees * Math.PI / 180;
                 };

                 x = Math.cos(Math.radians(theDegreeWeWantT));
                 y = Math.sin(Math.radians(theDegreeWeWantT));
             *
             */
            currentPoint.x = (Math.cos(Math.toRadians(degree)) - 1) * hookShotLength;

            currentPoint.y = Math.sin(Math.toRadians(degree)) * hookShotLength;

            String position = String.format("Degree: %d, X: %.3f, Y: %.3f",
                    degree,
                    -currentPoint.x,
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
        HookShotMovement hsm = new HookShotMovement(100);
        // Change the integer degree 0~180, the smaller degree number, display more positions
        hsm.heroMove(45);
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
