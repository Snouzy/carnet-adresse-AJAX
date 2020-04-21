<div class="container-fluid">
    <section class="col .col-xs-12 .col-sm-6 .col-md-8 col-lg-6">
        <h3 class="text-primary">Ajouter un contact </h3><hr>
        <form action="" method="post">
            <div class="form-group">
                <label for="name" class="col-md-2 control-label">Name</label>
                <div class="col-md-10">
                    <input name="name" class="form-control" id="name" type="text">
                </div>
            </div>

            <div class="form-group">
                <label for="prenom" class="col-md-2 control-label">prenom</label>
                <div class="col-md-10">
                    <textarea class="form-control" rows="3" name="prenom" id="prenom"></textarea>
                </div>
            </div>
            <button type="submit" name="createBtn" class="btn btn-success pull-right">
                Créer un contact<i class="fa fa-plus"></i></button>
        </form>
    </section>
</div>