class Engine {
    constructor(time_step, update, render) {

        this.accumulated_time        = 0;
        this.animation_frame_request = undefined,
        this.time                    = undefined,
        this.time_step               = time_step,
      
        this.updated = false;
      
        this.update = update;
        this.render = render;
    }

    run(time_stamp) {
        this.animation_frame_request = window.requestAnimationFrame(this.handleRun);
        this.accumulated_time += time_stamp - this.time;
        this.time = time_stamp;

        /* This is the safety if statement. */
        if (this.accumulated_time >= this.time_step * 3) {
            this.accumulated_time = this.time_step;
        }

        while(this.accumulated_time >= this.time_step) {
            this.accumulated_time -= this.time_step;
            this.update(time_stamp);
            this.updated = true;
        }

        if (this.updated) {
            this.updated = false;
            this.render(time_stamp);
        }
    }

    handleRun(time_step) { this.run(time_step); }
    
    start() {
        this.accumulated_time = this.time_step;
        this.time = window.performance.now();
        this.animation_frame_request = window.requestAnimationFrame(this.handleRun);
    }

    stop() {window.cancelAnimationFrame(this.animation_frame_request); }
}