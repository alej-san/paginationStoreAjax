 
 
 <form action="{{url('imagestore')}}" enctype="multipart/form-data" method="post">
            @csrf
            Title
            <input type="text" name="title" id="title"/>
            Description
            <input type="text" name="description" id="description"/>
            Price
            <input type="text" name="price" id="price"/>
            Genre
            <input type="text" name="genre" id="genre"/>
            Date
            <input type="date" name="releasedate" id="releasedate"/>
            File
            <input type="file" name="file" id="file"/>
            <input type="submit" value="Submit"/>
        </form>